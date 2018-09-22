import React from 'react';
import PropTypes from 'prop-types';
import ReactRevealText from 'react-reveal-text';

export const TodaysDate  = props => {

    const currentTime = new Date(props.time);

    return(
        <ReactRevealText 
            show={props.showDate}
            className="date"
        >
            {currentTime.toLocaleDateString(props.locale, props.dateFormat)}
        </ReactRevealText>
    );
    
}

TodaysDate.propTypes = {
    locale: PropTypes.string,
    dateFormat: PropTypes.object,
    showDate: PropTypes.bool
}

export default TodaysDate;