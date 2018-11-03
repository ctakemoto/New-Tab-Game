/* global chrome */

import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import makeCarousel from 'react-reveal/makeCarousel';
import Emoji from './Emoji.js';
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
            highscore: 0,
            fastestTime: null,
            numGamesWon: 0,
            checkedHighscore: null
        };
    }

    componentDidMount() {
        //grab stored game data on component load
        this.updateHighscore();
    }

    updateHighscore = () => {
        //update the numbers displayed here from what's stored in Chrome

        var highscore, fastestTime, numGamesWon;
        //If there is a highscore stored in chrome then get it, otherwise set to 0
        chrome.storage.sync.get(['highscore','fastestTime', 'numGamesWon'], (data) => {
            fastestTime = typeof data.fastestTime === 'undefined' ? null : data.fastestTime;
            highscore = typeof data.highscore === 'undefined' ? 0 : data.highscore;
            numGamesWon = typeof data.numGamesWon === 'undefined' ? 0 : data.numGamesWon;
            this.setState({highscore: highscore, fastestTime: fastestTime, numGamesWon: numGamesWon});
          });
    }

    checkForHighscore = () => {
        //Check for a new highscore, and if so sets it in storage

        if(this.state.highscore < this.props.score.total_score){

            chrome.storage.sync.set({highscore: this.props.score.total_score}, () => {
                // Set the new highscore
                console.log('Set new highscore: ' + this.props.score.total_score);
            });

            this.setState({highscore: this.props.score.total_score});
        }
        //if the game was won
        if(this.props.score.win_bonus > 0){
            //if there is no current fastest time or fastest time is more than current record, then set fastest time to the current time otherwise set to the current record
            var newTimeRecord = 
                typeof this.state.fastestTime === 'undefined' || this.state.fastestTime === null || this.state.fastestTime > this.props.time ?
                    this.props.time :
                    this.state.fastestTime;
           

            chrome.storage.sync.set({fastestTime: newTimeRecord, numGamesWon: this.state.numGamesWon+1}, () => {
                // Set the new highscore
                console.log('Set new fastest time: ' + newTimeRecord);
            });
            this.setState({fastestTime: newTimeRecord, numGamesWon: this.state.numGamesWon+1});

        }
    }

    render(){
        if(this.props.gameFinished && this.state.checkedHighscore !== this.props.gameID){
            //if the game is over, check for highscore
            this.checkForHighscore();

            //set the flag that it was checked for this game so it will only run once per game
            this.setState({checkedHighscore: this.props.gameID});
        }
        return(
            <div className='game__info'>

                <Carousel maxTurns={0}>
                    <Slide right>
                    <div className='carousel__title'>Current Highscore</div>
                        <div className='game__info__highscore carousel__text'>
                            {this.state.highscore + ' pts'}
                        </div>
                    </Slide>
                    <Slide right>
                    <div className='carousel__title'>Current Fastest Time</div>
                        <div className='game__info__highscore carousel__text'>
                            {this.state.fastestTime === null || typeof this.state.fastestTime === 'undefined'  ? 'No record' : this.state.fastestTime + ' s'}
                        </div>
                    </Slide>
                    <Slide right>
                    <div className='carousel__title'>Number of Games Won</div>
                        <div className='game__info__highscore carousel__text'>
                            {this.state.numGamesWon + ' games'}
                        </div>
                    </Slide>
                    <Slide right>
                        <div>
                            <div className='carousel__title'>Objective</div>
                            <p className='carousel__text'>
                                ・Find all the hidden <Emoji symbol="💎" label="diamond"/>{'\n'}
                                ・<Emoji symbol="🏴" label="flag"/> tiles that you think contain <Emoji symbol="💎" label="diamond"/>
                            </p>
                        </div>
                    </Slide>
                    <Slide right>
                        <div>
                            <div className='carousel__title'>Instructions</div>
                            <p className='carousel__text'>
                                ・Right click on a tile to set a <Emoji symbol="🏴" label="flag"/>{'\n'} 
                                ・Click to reveal hints 
                            </p>
                        </div>
                    </Slide>
                </Carousel>
                    
                <Fade when={this.props.gameFinished} >
                    <div className='game__info__time emph'>
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

