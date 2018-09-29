/* global chrome */
import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
// import makeCarousel from 'react-reveal/makeCarousel';
// // we'll need the Slide component for sliding animations
// // but you can use any other effect
// import Slide from 'react-reveal/Slide';

// const Container = props => {
//     return(
//         <div className='container'>
//             {props}
//         </div>
//     );
// }
// const CarouselUI = ({ children }) => <Container>{children}</Container>;
// const Carousel = makeCarousel(CarouselUI);

// const CarouselPanel = props => {
//     return(
//         <Carousel defaultWait={1000}>
//             <Slide right>
//             <div>
//                 <h1>Slide 1</h1>
//                 <p>Slide Description</p>
//             </div>
//             </Slide>
//             <Slide right>
//             <div>
//                 <h1>Slide 2</h1>
//                 <p>Slide Description</p>
//             </div>
//             </Slide>
//         </Carousel>
//     );
// } 

class InfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highscore: 0
        };
    }

    componentDidMount() {
        var highscore;
        //If there is a highscore stored in chrome then get it, otherwise set to 0
        chrome.storage.sync.get(['highscore'], (data) => {
            console.log('get highscore: '+ data.highscore);
            highscore = typeof data.highscore === 'undefined' ? 0 : data.highscore;
            this.setState({highscore: highscore});
          });
          
    }

    checkForHighscore = () => {
        //Check for a new highscore, and if so sets it in storage
        console.log('highscore: '+this.state.highscore+' total_score: '+this.props.score.total_score);

        if(this.state.highscore < this.props.score.total_score){
            console.log('checking for highscore');

            chrome.storage.sync.set({highscore: this.props.score.total_score}, () => {
                // Set the new highscore
                console.log("Set new highscore: " + this.props.score.total_score);
            });

            this.setState({highscore: this.props.score.total_score});
        }
    }

    render(){
        if(this.props.gameFinished){
            //if the game is over, check for highscore
            this.checkForHighscore();
            
        }
        return(
            <div className='game__info'>
                
                {/* <Fade when={this.highscore !== 0 }> */}
                    <div className='game__info__highscore'>
                        {'Current Highscore: '+this.state.highscore}
                    </div>
                {/* </Fade> */}
                    
                <Fade when={this.props.gameFinished} >
                    <div className='game__info__time'>
                        {'Finished in '+ this.props.time + ' seconds'}
                    </div>
                </Fade>

                <Fade when={this.props.gameFinished} >
                    <div className='game__info__score'>
                        <span className='label'> {'\nTime bonus: '} </span>
                        <span className='points'> {this.props.score.time_score +' pts'} </span>
                        <span className='label'> {'\nFlag bonus: '} </span>
                        <span className='points'> {this.props.score.flag_score +' pts'} </span>
                        <span className='label'> {'\nWin bonus: '} </span>
                        <span className='points'> {this.props.score.win_bonus +' pts'} </span>
                        <span className='label'> {'\nTotal score: '} </span>
                        <span className='points'> {this.props.score.total_score +' pts'} </span>
                    </div>
                </Fade>

                <button onClick={() => this.props.newGame()} className='game__info__new_game'>
                    New Game
                </button>
            </div>
        );
    }
    
}

export default InfoPanel;

