import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Greeting extends Component {
    render(){
        var currentTime = new Date(this.props.time);
        return(
            <div>Hello it is {currentTime.toLocaleDateString(this.props.locale, this.props.timeFormat)}</div>
        );
    }
}

Greeting.propTypes = {
    locale: PropTypes.string,
    timeFormat: PropTypes.string
}

export default Greeting;