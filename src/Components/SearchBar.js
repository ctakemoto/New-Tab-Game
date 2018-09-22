import React from 'react';
import Fade from 'react-reveal/Fade';
//import PropTypes from 'prop-types';


export const SearchBar = () => {

    return (
        <Fade>
            <form   action='http://www.google.com/search' 
                    method='get' 
                    className='searchbar'>
                <input type='text' name='q' className='searchbar__searchbox'/>
                <input type='submit' value='Go' className='searchbar__button'/>
            </form>
        </Fade>
    );
    
}