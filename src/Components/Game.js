import React, { Component } from 'react';

export const Square = props => {
    return (
        <div className={'game__square ' + props.type} onClick={() => props.handleClick}>      
            {props.value}
        </div>
    );
}

export const Board = props => {

    return(
        <div className='game__board'>
            {props.squares.map((nested, yindex )=>
                <div className='game__board__col'>
                    {nested.map((value, xindex) =>
                        <Square 
                            key={[xindex, yindex]}
                            value={value} 
                            //value={[xindex, yindex]}
                            type={value === 'x' ? 'bomb':''}
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

    handleClick = (i) => {

    }

    componentWillMount = () => {
        this.initGame();
    }

    initGame = () => {
        //each row is it's own array
        var board = new Array(this.state.boardDimensions).fill(0).map(x => Array(this.state.boardDimensions).fill(0));

        //chose a random number of bombs between a fourth and a third the number of squares
        //const numBombs = this.randInt(this.state.numSquares/4,this.state.numSquares/3)
        const numBombs = 10;
        var currentSquare;

        //populate bombs randomly on the board
        //add 1 to the surrounding squares
        for(var i=0; i < numBombs; i++){
            currentSquare = this.randSquare();
            //check to see if the square has already been set as a bomb before
            if (board[currentSquare[0]][currentSquare[1]] !== 'x'){
                board[currentSquare[0]][currentSquare[1]] = 'x';
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

    setSurroundingNumbers = (board, currentSquare) => { 
        //and adds a count of one to each of the surrounding squares

        //get range of the surrounding square coordinates
        let xmin = currentSquare[0]-1 < 0 ? 0 : currentSquare[0]-1;
        let ymin = currentSquare[1]-1 < 0 ? 0 : currentSquare[1]-1;

        let xmax = currentSquare[0]+1 >= this.state.boardDimensions ? this.state.boardDimensions-1 : currentSquare[0]+1;
        let ymax = currentSquare[1]+1 >= this.state.boardDimensions ? this.state.boardDimensions-1 : currentSquare[1]+1;

        console.log(currentSquare,': ','(', xmin, ymin, ')','(', xmax,ymax,')');
        for(var i=xmin; i <= xmax; i++ ){
            for(var j=ymin; j <= ymax; j++){
                //If the square being looked at isn't a bomb add 1 to it's number.
                if(board[i][j] !== 'x') {
                    board[i][j] += 1;
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
                <Board squares={this.state.squares}/>
            </div>
        );
    }
}

export default Game;