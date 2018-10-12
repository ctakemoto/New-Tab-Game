import React, { Component } from 'react';
import Board from './Board.js';
import InfoPanel from './InfoPanel.js';
import Fade from 'react-reveal/Fade';

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
          squares: null,                        //holds arrays representing the board
          boardDimensions: props.boardDimensions,
          numSquares: Math.pow(props.boardDimensions,2),
          numBombs: 0,                          //number of bombs placed on the map
          numFlagged: 0,                        //track # correctly flagged bombs
          gameFinished: false,                  //false while game is ongoing, true when it's finished
          start: 0,                             //store time at start of game
          time: 0,                              //store duration of game once it's finished
          scoreFlagBonus: 300,                  //total points awarded if the user finds all the flags
          scoreTimeBonus: 2000,                 //awarded if the user wins, gets more points the quicker they finish
          scoreWinBonus: 100,                   //flat bonus awarded for winning the game
          score: 0,                             //final total score at end of the game
          gameID: 0                             //keep track of how many games done this session
        };
    }

    
    handleDoubleClick = (e, coord) => {
        //Toggle the flagged state of any square that's been clicked on.
        //and track the current number of correctly flagged bombs

        e.preventDefault();

        //only if the game is active
        if(this.state.gameFinished === false){


            //get number of correctly flagged so far
            var flagged = this.state.numFlagged;

            var board = this.state.squares;

            //toggle the flag if double clicked
            if(board[coord[0]][coord[1]].state === 'flagged'){
                board[coord[0]][coord[1]].state = 'unclicked'
                //if the square being unflagged is a bomb, decrease number flagged
                flagged = board[coord[0]][coord[1]].type === 'target' ? flagged-1 : flagged;
            }
            else {
                board[coord[0]][coord[1]].state = 'flagged'
                //if the ssquare being flagged is a bomb, increase number flagged
                flagged = board[coord[0]][coord[1]].type === 'target' ? flagged+1 : flagged;
            }

             //update the board
             this.setState({
                squares: board,
                numFlagged: flagged
            });
            //check to see if the user has won the game
            var winCheck = this.checkForWin(board);

            if (winCheck > 0){
                this.endGame(winCheck);
            }
        }
        
    }

    handleClick = (coord) => {


        var board = this.state.squares;
        
        //start time on the first click
        var time = this.state.start === 0 ? Date.now() : this.state.start;

        //only if the game is active and square hasn't been flagged
        if(this.state.gameFinished === false && board[coord[0]][coord[1]].state !== 'flagged'){


            board[coord[0]][coord[1]].state = 'clicked';

            if(board[coord[0]][coord[1]].type === 'target'){
                //if a bomb is clicked on then the game is over
                this.endGame(0);
            }
            else if(board[coord[0]][coord[1]].value === 0){
                
                //if an empty square is clicked on then need to flood open the surrounding squares
                board = this.revealSquares(coord, board);
    
            }

            //update the state
            this.setState({
                squares: board,
                start: time
            });

            //check to see if the user has won the game
            var winCheck = this.checkForWin(board);

            if (winCheck > 0){
                this.endGame(winCheck);
            }
        }
    }


    checkForWin = (board) => {
        //check squares to see if the player has won
        //If the game is on-going func with return 0, otherwise return 1
        
        for(var i = 0; i < this.state.boardDimensions; i++){
            for(var j=0; j < this.state.boardDimensions; j++){
                if(board[i][j].state === 'unclicked'){
                    //if there is a square that hasn't been clicked or flagged yet, then the game isn't won 
                    return 0;
                }
            }
        }
        return 1;
    }

    revealSquares = (coord, board) => {
        //When an empty square is clicked on, reveal all adjacent blank squares until hitting numbers

        //stack of squares to examine
        var toExplore = [coord];
        var currentSquare, next;

        while (toExplore.length > 0) {
            //look at next square in the stack and the surrounding squares
            currentSquare = toExplore.shift();
            next = this.getSurroundingSquares(currentSquare);
            
            for(var i=next.xmin; i <= next.xmax; i++ ){
                for(var j=next.ymin; j <= next.ymax; j++){
                    //If the square being looked at isn't adjacent to a bomb then look at the surrounding squares
                    if(board[i][j].state === 'unclicked' & board[i][j].value === 0 ){
                        board[i][j].state = 'clicked';
                        toExplore.push([i,j]);
                    }
                    //if it's a number, reveal it but don't look at surrounding squares
                    else if (board[i][j].state === 'unclicked' & board[i][j].value > 0){
                        board[i][j].state = 'clicked';
                    }
                }
            }
        }
        return board;
    }

    endGame = (winCheck) => {
        //called when a bomb has been clicked on or the user has won the game.
        //if winCheck == 0, then that means the user has lost.
        //otherwise calculate score.

        //time game took to finish
        var time;
        //when first square clicked is a bomb, then start doesn't have time to be set
        if (this.state.start !== 0){
            time = ((Date.now()- this.state.start)/1000).toFixed(1);
        }
        else {
            time = 0;
        }
        

        //points added for finishing the game quickly if the user won
        const time_score = winCheck === 0 ? 0 : Math.round((30/time) * this.state.scoreTimeBonus);
        //points added for percentage of bombs the user was able to flag
        const flag_score = Math.round((this.state.numFlagged/this.state.numBombs) * this.state.scoreFlagBonus);
        //there's a bonus for winning the game
        const win_bonus = winCheck === 0 ? 0 : this.state.scoreWinBonus;

        const total_score = time_score + flag_score + win_bonus;

        this.setState({
            gameFinished: true,
            time: time,
            start: 0,
            score: { time_score: time_score, flag_score: flag_score, win_bonus: win_bonus, total_score: total_score}
        });
    }


    componentWillMount = () => {
        this.initGame();
    }

    //Initialize the Game
    //  Create board and populate randomly with bombs
    initGame = () => {
        //each column is it's own array
        var board = new Array(this.state.boardDimensions).fill(0).map(x => Array(this.state.boardDimensions).fill().map(x => ({value:0, state:'unclicked', type:'safe'})));

        //chose a random number of bombs between a fifth and a fourth the number of squares
        const numBombs = this.randInt(this.state.numSquares/5,this.state.numSquares/4)

        var currentSquare;

        //populate bombs randomly on the board
        //add 1 to the surrounding squares
        for(var i=0; i < numBombs; i++){
            currentSquare = this.randSquare();
            //check to see if the square has already been set as a bomb before
            if (board[currentSquare[0]][currentSquare[1]].type === 'safe'){
                board[currentSquare[0]][currentSquare[1]].value = 'x';
                board[currentSquare[0]][currentSquare[1]].type = 'target';
                board = this.setSurroundingNumbers(board, currentSquare);
            }
            
        }

        this.setState({
            squares: board,
            gameFinished: false,
            numBombs: numBombs,
            numFlagged: 0,
            score: 0,
            start: 0,
            gameID: this.state.gameID + 1
        });
    }

    getSurroundingSquares = (currentSquare) => {
        //get range of the surrounding square coordinates
        let xmin = currentSquare[0]-1 < 0 ? 0 : currentSquare[0]-1;
        let ymin = currentSquare[1]-1 < 0 ? 0 : currentSquare[1]-1;

        let xmax = currentSquare[0]+1 >= this.state.boardDimensions ? this.state.boardDimensions-1 : currentSquare[0]+1;
        let ymax = currentSquare[1]+1 >= this.state.boardDimensions ? this.state.boardDimensions-1 : currentSquare[1]+1;

        return {xmin: xmin, xmax: xmax, ymin:ymin, ymax:ymax};
    }

    setSurroundingNumbers = (board, currentSquare) => { 
        //adds a count of one to each of the surrounding squares to the current square

        let coord = this.getSurroundingSquares(currentSquare);

        for(var i=coord.xmin; i <= coord.xmax; i++ ){
            for(var j=coord.ymin; j <= coord.ymax; j++){
                //If the square being looked at isn't a bomb add 1 to it's number.
                if(board[i][j].type === 'safe') {
                    board[i][j].value += 1;
                }
            }
        }
        return board;
    }

    randInt = (min, max) => {
        //picks a random number between min and max
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    randSquare = () => {
        //picks a random coordinate pair which specifies a certain square
        var pos = new Array(2);
        pos[0] = this.randInt(0, this.state.boardDimensions);
        pos[1] = this.randInt(0, this.state.boardDimensions);
        return pos;
    }

    render(){
        return (
            <Fade bottom when={this.props.showGame}>
                <div className='game'>
                    <Board {...this.state}
                        clickCallback={this.handleClick} 
                        doubleCallback={this.handleDoubleClick}
                        />
                    <InfoPanel {...this.state} newGame={this.initGame}/>
                </div>
            </Fade>
        );
    }
}

export default Game;