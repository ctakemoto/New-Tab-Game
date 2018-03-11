import React from 'react';
import PropTypes from 'prop-types';

const Greeting = props => {

    //time interval start and finish in hhmm format followed by greeting
    const greetings = [[500,1159,'Good Morning'],
        [1200,1659,'Good Afternoon'],
        [1700,2159,'Good Evening'],
        [2200,2400,'Good Night'],
        [0,459,'Good Night']]


    const timeInInterval = (time, start, finish) => {
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

    const pickGreeting = () => {
        for (var i = 0; i < greetings.length; i++){
            
            if (timeInInterval(props.time, greetings[i][0],greetings[i][1])){
                return greetings[i][2];
            }
        }
    }

    return(
        <div className="greeting">
        {pickGreeting()} 
        </div>
    );

}

Greeting.propTypes = {
    locale: PropTypes.string,
    timeFormat: PropTypes.object
}

export default Greeting;