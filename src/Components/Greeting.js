import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Greeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
          greetings: [[0,1159,'Good Morning'],
                [1200,1600,'Good Afternoon'],
                [1659,2159,'Good Evening'],
                [2200,2400,'Good Night']]
        }
    
    }

    timeInInterval = (time, start, finish) => {
        //returns True if time is between start and finish and False if not
        var tempTime = new Date(time);
        
        var temp = Number(tempTime.getHours() + '' + tempTime.getMinutes());

        console.log(start, temp, finish);

        if (temp >= start && temp < finish){
            return true;
        }
        else {
            return false;
        }
    }

    pickGreeting = () => {
        for (var i = 0; i < this.state.greetings.length; i++){
            console.log('loop '+i);
            console.log(this.timeInInterval(this.props.time, this.state.greetings[i][0],this.state.greetings[i][1]));
            if (this.timeInInterval(this.props.time, this.state.greetings[i][0],this.state.greetings[i][1])){
                return this.state.greetings[i][2];
            }
        }
    }
    render(){
        
        return(
            <div className="greeting">
            {this.pickGreeting()} 
            </div>
        );
    }
}

Greeting.propTypes = {
    locale: PropTypes.string,
    timeFormat: PropTypes.object
}

export default Greeting;