import React, { Component } from 'react';

/*
Game Square
    Value: #, x
    State: unclicked, clicked, flagged
    Type: safe, bomb
*/

export const Square = props => {
    return (
        <div className={props.gameFinished === 1 && props.type === 'bomb' ? 
                'game__square ' + props.type + '-end'
                : 'game__square ' + props.type +'-'+ props.state
                } 
            onClick={() => props.clickCallback(props.coord)}
            onContextMenu={(e) => props.doubleCallback(e, props.coord)}>    
            <span className='game__square__text'>
                {props.value}
            </span>
        </div>
    );
}

export default Square;