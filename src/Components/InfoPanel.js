/* global chrome */
import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import makeCarousel from 'react-reveal/makeCarousel';
// we'll need the Slide component for sliding animations
// but you can use any other effect
import Slide from 'react-reveal/Slide';

const Arrow = props => {
    return(
        <div className='arrow' 
            style={{left: props.right ? '90%': '0%'}}
            onClick={props.onClick}
            data-position={props.dataPosition}>
            {props.right ? '>' : '<'}
        </div>
    );
}

const Container = ({ position, handleClick, children }) => {
    return(
        <div className='game__info__carousel'>
             {children}
            <Arrow onClick={handleClick} dataPosition={position - 1}/>
            <Arrow right onClick={handleClick} dataPosition={position + 1}/>
        </div>
    );
}

const Carousel = makeCarousel(Container);

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

        if(this.state.highscore < this.props.score.total_score){

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

                <Carousel maxTurns='0'>
                    <Slide right>
                        <div className='game__info__highscore'>
                            {'Current Highscore: '+this.state.highscore}
                        </div>
                    </Slide>
                    <Slide right>
                    <div>
                        <h1>Slide 2</h1>
                        <p>Slide Description</p>
                    </div>
                    </Slide>
                    <Slide right>
                    <div>
                        <h1>Slide 3</h1>
                        <p>Slide Description</p>
                    </div>
                    </Slide>
                </Carousel>
                    
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
                        <span className='label emph'> {'\nTotal score: '} </span>
                        <span className='points emph'> {this.props.score.total_score +' pts'} </span>
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

