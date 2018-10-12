import React from 'react';
import Emoji from './Emoji.js';

/*
Game Square
    Value: #, x
    State: unclicked, clicked, flagged
    Type: safe, target

*/

const unclickedSquareTextStyle = {
    display: 'none' 
}


export const Square = props => {
    return (
        <div className={props.gameFinished && props.type === 'target' ? 
                'game__square ' + props.type + '-end'
                : 'game__square ' + props.type +'-'+ props.state
                } 
            onClick={() => props.clickCallback(props.coord)}
            onContextMenu={(e) => props.doubleCallback(e, props.coord)}> 

            {
                props.state === 'unclicked' && props.gameFinished === false ? 
                
                '' :
                <span   className='game__square__text' 
                        style={props.state === 'unclicked' && !props.gameFinished ?
                                unclickedSquareTextStyle 
                                :
                                props.gameFinished && props.type !== 'target' && props.state === 'unclicked' ?
                                unclickedSquareTextStyle
                                :
                                null
                                }>
                    {
                        props.state === 'flagged' ? <Emoji symbol="🏴" label="flag"/> :
                        props.value === 0 ? ' ' : 
                        props.value === 'x' ? <Emoji symbol="💎" label="target"/> :
                        props.value
                    
                    } 
                </span>
            }
            
            
        </div>
    );
}

export default Square;