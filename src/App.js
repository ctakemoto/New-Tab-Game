import React, { Component } from 'react';
import Greeting from './Components/Greeting.js';
import { SearchBar } from './Components/SearchBar.js';
import Game from './Components/Game.js';
import { TodaysDate } from './Components/TimeDate.js';
/* If images stored in src
import logo from './logo.png';
// ...
const image = <img src={logo} className="image" alt="Logo" />;
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().getTime(),
      showGreeting: false,
      showDate: false,
      showSearchbar: false,
      showGame: false
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
      boardDimensions: 14
    };

  }

  componentDidMount() {
    //Set timing for when the different elements will fade in
    setTimeout(() => {
      this.setState({ 
        showGreeting: true, 
        showDate: true
      });
     }, 500);
     /*********************/
     setTimeout(() => {
      this.setState({ 
        showSearchbar: true
      });
     }, 1000);
     /*********************/
     setTimeout(() => {
      this.setState({ 
        showGame: true 
      });
     }, 1500);
    
  }

  render() {
    return (
      <div className='app'>

        <TodaysDate {...this.state} {...this.settings}/>
        <Greeting {...this.state} {...this.settings}/>
        <SearchBar {...this.state} {...this.settings}/>
        <Game {...this.state} {...this.settings}/>
        
      </div>
    );
  }
}

export default App;
