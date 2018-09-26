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
    // constructor(props) {
    //     super(props);
        
    // }

    render(){
        return(
            <div className='game__info'>
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

