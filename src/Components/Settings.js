/* global chrome */

import React, { Component } from 'react';

class Settings extends Component {

    handleClick = () => {
        console.log('settings');
    }

    render(){
        return(
            <div className='settings' onClick={this.handleClick}>
                <i className="fas fa-cog fa-lg"></i>
            </div>
        );
    }    
}

export default Settings;