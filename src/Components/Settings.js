/* global chrome */

import React, { Component } from 'react';
import Popup from "reactjs-popup";

class Settings extends Component {

    handleClick = () => {
        console.log('clearing');
        chrome.storage.sync.set({highscore: 0, fastestTime: null, numGamesWon: 0}, () => {
            console.log('Records cleared');
        });
    }

    render(){
        return(
            <Popup trigger={<i className="fas fa-cog fa-lg settings-button"></i>
                            }
                    position='left top'
                    contentStyle={{ justifyContent: "center", borderRadius: "5px" }}
                    closeOnDocumentClick
            >
            <div className='settings-panel'>
                <button onClick={() => this.handleClick()}>
                    Clear Highscore
                </button>
            </div>
            </Popup>
        );
    }    
}

export default Settings;