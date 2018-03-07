import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Greeting extends Component {
    render(){
        var currentTime = new Date(this.props.time);
        return(
            <div>Hello it is </div>
        );
    }
}

Greeting.propTypes = {
    locale: PropTypes.string,
    timeFormat: PropTypes.object
}

export default Greeting;