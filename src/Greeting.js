import React, { Component } from 'react';

class Greeting extends Component {
    render(){
        var currentTime = new Date(this.props.time);
        return(
            <div>Hello it is {currentTime.toLocaleDateString(this.props.locale, this.props.timeFormat)}</div>
        );
    }
}

export default Greeting;