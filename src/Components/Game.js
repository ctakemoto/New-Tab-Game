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
            {props.squares.map((value, index) =>
                <Square key={index}
                        //value={value} 
                        value={index}
                        type={value === 'x' ? 'bomb':''}
                        />
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
          numSquares: Math.pow(props.boardDimensions,2)
        };
    }

    handleClick = (i) => {

    }

    componentWillMount = () => {
        this.initGame();
    }

    initGame = () => {
        var board = new Array(this.state.numSquares).fill(' ', 0, this.state.numSquares);

        //chose a random number of bombs between a fourth and a third the number of squares
        const numBombs = this.randSquare(this.state.numSquares/4,this.state.numSquares/3)
        //populate bombs on the board
        for(var i=0; i < numBombs; i++){
            board[this.randSquare(0, this.state.numSquares)] = 'x';
        }

        this.setState({
            squares: board 
        });
    }

    randSquare = (min, max) => {
        //picks a random number between min and max
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
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