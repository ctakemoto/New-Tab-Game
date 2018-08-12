import React, { Component } from 'react';

export const InfoPanel = props => {
    return(
        <div className="game__info">
            <button onClick={() => props.newGame()}>
                New Game
            </button>
        </div>
    );
}

export default InfoPanel;