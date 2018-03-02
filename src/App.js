import React, { Component } from 'react';
import Greeting from './Greeting.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().getTime(),
      timeFormat: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      },
      locale: "en-US"
    }

}
  render() {
    return (
      <div className="App">
        <Greeting {...this.state}/>
      </div>
    );
  }
}

export default App;
