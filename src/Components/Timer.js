import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            time: 0,
            start: Date.now()
        };
    }

    componentDidMount() {
        //set
        let timer = setInterval( () => this.update, 1000);
        this.setState({
            timer: timer
        });
    }
    
    componentWillUnmount() {
        this.clearInterval(this.state.timer);
    }

    clearTimer() {
        this.setState({
            time: 0
        });
    }

    update() { 
        this.setState({
          time: this.state.time + 1
        });
    }
    
    render(){
        return(
            <div className='game__info__timer'>
                {this.state.time} seconds
            </div>
        );
    } 
}

export default Timer;