import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Greeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //time interval start and finish in hhmm format followed by greeting
          greetings: [[500,1159,'Good Morning'],
                [1200,1659,'Good Afternoon'],
                [1700,2159,'Good Evening'],
                [2200,2400,'Good Night'],
                [0,459,'Good Night']]
        }
    
    }

    timeInInterval = (time, start, finish) => {
        //returns True if time is between start and finish and False if not
        var tempTime = new Date(time);
        
        var temp = Number(tempTime.getHours() + '' + tempTime.getMinutes());

        if (temp >= start && temp < finish){
            return true;
        }
        else {
            return false;
        }
    }

    pickGreeting = () => {
        for (var i = 0; i < this.state.greetings.length; i++){
            
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