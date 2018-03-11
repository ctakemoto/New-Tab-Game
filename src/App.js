import React, { Component } from 'react';
import Greeting from './Components/Greeting.js';
import SearchBar from './Components/SearchBar.js';
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
      locale: 'en-US'
    }

}
  render() {
    return (
      <div className='app'>
        <div className='header'>
          <TodaysDate {...this.state} {...this.settings}/>
          <Clock {...this.state} {...this.settings}/>
          <Greeting {...this.state} {...this.settings}/>
        </div>
        <SearchBar {...this.state} {...this.settings}/>
      </div>
    );
  }
}

export default App;
