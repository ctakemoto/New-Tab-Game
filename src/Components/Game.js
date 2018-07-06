import React, { Component } from 'react';

export const Square = props => {
    return (
        <div className={'game__square ' + props.type +' '+ props.state} 
            onClick={() => props.clickCallback(props.coord)}>    
            <span className='game__square__text'>
                {props.value}
            </span>
        </div>
    );
}

export const Board = props => {

    return(
        <div className='game__board'>
            {props.squares.map((nested, xindex )=>
                <div className='game__board__col' key={xindex}>
                    {nested.map((element, yindex) =>
                        <Square 
                            key={[xindex, yindex]}
                            value={element.value === 0 ? ' ' : element.value} 
                            state={element.state}
                            type={element.type}
                            coord={[xindex, yindex]}
                            clickCallback={props.clickCallback}
                    />
                    )}
                </div>
            )}
        </div>
    );

}

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
          score: 0,
          squares: null,
          moves: 0,
          boardDimensions: props.boardDimensions,
          numSquares: Math.pow(props.boardDimensions,2)
        };
    }

    handleClick = (coord) => {
        var board = this.state.squares;
        
        board[coord[0]][coord[1]].state = 'clicked';

        if(board[coord[0]][coord[1]].type === 'bomb'){
            //if a bomb is clicked on then the game is over
            console.log('game over');
        }
        else if(board[coord[0]][coord[1]].value === 0 ){
            //if an empty square is clicked on then need to flood open the surrounding squares
            board = this.revealSquares(coord, board);

        }

        //update the board
        this.setState({
            squares: board
        });
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
                    if(board[i][j].state !== 'clicked' & board[i][j].value === 0 ){
                        board[i][j].state = 'clicked';
                        toExplore.push([i,j]);
                    }
                    //if it's a number, reveal it but don't look at surrounding squares
                    else if (board[i][j].state !== 'clicked' & board[i][j].value > 0){
                        board[i][j].state = 'clicked';
                    }
                }
            }
        }
        return board;
    }

    componentWillMount = () => {
        this.initGame();
    }

    initGame = () => {
        //each row is it's own array
        var board = new Array(this.state.boardDimensions).fill(0).map(x => Array(this.state.boardDimensions).fill().map(x => ({value:0, state:'unclicked', type:'safe'})));

        //chose a random number of bombs between a fourth and a third the number of squares
        const numBombs = this.randInt(this.state.numSquares/4,this.state.numSquares/3)

        var currentSquare;

        //populate bombs randomly on the board
        //add 1 to the surrounding squares
        for(var i=0; i < numBombs; i++){
            currentSquare = this.randSquare();
            //check to see if the square has already been set as a bomb before
            if (board[currentSquare[0]][currentSquare[1]].type === 'safe'){
                board[currentSquare[0]][currentSquare[1]].value = 'x';
                board[currentSquare[0]][currentSquare[1]].type = 'bomb';
                board = this.setSurroundingNumbers(board, currentSquare);
            }
            else {
                //if it has then don't re-do it

            }
            
        }

        this.setState({
            squares: board 
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
        //and adds a count of one to each of the surrounding squares

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
        var pos = new Array(2);
        pos[0] = this.randInt(0, this.state.boardDimensions);
        pos[1] = this.randInt(0, this.state.boardDimensions);
        return pos;
    }

    render(){
        return (
            <div className='game'>
                <Board squares={this.state.squares} clickCallback={this.handleClick}/>
            </div>
        );
    }
}

export default Game;