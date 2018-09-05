import React from 'react';
//import Timer from './Timer.js';

export const InfoPanel = props => {
    return(
        <div className="game__info">
            {props.gameFinished === 1 ? props.time.toFixed(2) + ' seconds': ''}
            <button onClick={() => props.newGame()} className={props.gameFinished === 1 ? 'button-display':'button-hide'} >
                New Game
            </button>
        </div>
    );
}

export default InfoPanel;