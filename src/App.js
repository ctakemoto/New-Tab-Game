import React, { Component } from 'react';
import Greeting from './Components/Greeting.js';
import { SearchBar } from './Components/SearchBar.js';
import Game from './Components/Game.js';
import { Clock, TodaysDate } from './Components/TimeDate.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().getTime(),
    };
    this.settings = {
      dateFormat: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      },
      timeFormat: {
        hour: '2-digit',
        minute: '2-digit'
      },
      locale: 'en-US',
      boardDimensions: 8
    }

}
  render() {
    return (
      <div className='app'>

        <TodaysDate {...this.state} {...this.settings}/>
        <Clock {...this.state} {...this.settings}/>
        <SearchBar {...this.state} {...this.settings}/>
        <Greeting {...this.state} {...this.settings}/>
        <Game {...this.state} {...this.settings}/>
      </div>
    );
  }
}

export default App;
