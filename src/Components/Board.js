import React, { Component } from 'react';
import Square from './Square.js';

export const Board = props => {

    return(
        <div className='game__board'>
            {props.squares.map((nested, xindex)=>
                <div className='game__board__col' key={xindex}>
                    {nested.map((element, yindex) =>
                        <Square 
                            key={[xindex, yindex]}
                            value={element.value === 0 ? ' ' : element.value} 
                            state={element.state}
                            type={element.type}
                            coord={[xindex, yindex]}
                            clickCallback={props.clickCallback}
                            doubleCallback={props.doubleCallback}
                            gameFinished={props.gameFinished}
                    />
                    )}
                </div>
            )}
        </div>
    );

}

export default Board;