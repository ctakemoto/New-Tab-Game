import React from 'react';
//import Timer from './Timer.js';

export const InfoPanel = props => {
    return(
        <div className='game__info'>
            <div className='game__info__time'>
                {props.gameFinished === 1 ? props.time + ' seconds': ''}
            </div>
            {props.gameFinished === 1 ? 
                <div className='game__info__score'>
                
                    <span className='game__info__score__label'> {'\nTime bonus: '} </span>
                    <span className='game__info__score__points'> {props.score.time_score +' pts'} </span>
                    <span className='game__info__score__label'> {'\nFlag bonus: '} </span>
                    <span className='game__info__score__points'> {props.score.flag_score +' pts'} </span>
                    <span className='game__info__score__label'> {'\nWin bonus: '} </span>
                    <span className='game__info__score__points'> {props.score.win_bonus +' pts'} </span>
                    <span className='game__info__score__label'> {'\nTotal score: '} </span>
                    <span className='game__info__score__points'> {props.score.total_score +' pts'} </span>
                </div>
                : ''}
            <button onClick={() => props.newGame()} className={props.gameFinished === 1 ? 'button-display':'button-hide'} >
                New Game
            </button>
        </div>
    );
}

export default InfoPanel;

