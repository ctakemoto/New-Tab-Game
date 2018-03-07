import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Clock extends Component {
    render(){
        var currentTime = new Date(this.props.time);
        return(
            <div className="clock">
                {currentTime.toLocaleTimeString(this.props.locale, this.props.timeFormat)}
            </div>
        );
    }
}

export class TodaysDate extends Component {
    render () {
        var currentTime = new Date(this.props.time);
        return(
            <div className="date">{currentTime.toLocaleDateString(this.props.locale, this.props.dateFormat)}</div>
        );
    }
}

