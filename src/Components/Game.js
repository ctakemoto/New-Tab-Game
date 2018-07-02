import React, { Component } from 'react';

export const Square = props => {
    return (
        <div className={'game__square ' + props.type} onCLick={() => props.handleClick}>      
            {props.value}
        </div>
    );
}

export const Board = props => {

    return(
        <div className='game__board'>
            {props.squares.map(nested =>
                <div className='game__board__col'>
                    {nested.map(value =>
                        <Square 
                            //key={[xindex, yindex]}
                            value={value} 
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
        var board = new Array(this.state.boardDimensions).fill(0).map(x => Array(this.state.boardDimensions).fill(' '));

        //chose a random number of bombs between a fourth and a third the number of squares
        const numBombs = this.randInt(this.state.numSquares/4,this.state.numSquares/3)
        var currentSquare;

        //populate bombs on the board
        //add 1 to the surrounding squares
        for(var i=0; i < numBombs; i++){
            currentSquare = this.randSquare();
            board[currentSquare[0]][currentSquare[1]] = 'x';
        }

        this.setState({
            squares: board 
        });
    }

    setSurroundingNumbers = (board, currentSquare) => {

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