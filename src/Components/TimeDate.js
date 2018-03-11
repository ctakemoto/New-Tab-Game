import React from 'react';
import PropTypes from 'prop-types';

export const Clock = props => {

    var currentTime = new Date(props.time);
    return(
        <div className="clock">
            {currentTime.toLocaleTimeString(props.locale, props.timeFormat)}
        </div>
    );

}

export const TodaysDate = props => {

    var currentTime = new Date(props.time);
    return(
        <div className="date">{currentTime.toLocaleDateString(props.locale, props.dateFormat)}</div>
    );
    
}
TodaysDate.propTypes = {
    locale: PropTypes.string,
    dateFormat: PropTypes.object
}

Clock.propTypes = {
    locale: PropTypes.string,
    timeFormat: PropTypes.object
}