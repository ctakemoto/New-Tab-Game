import React, { Component } from 'react';
import PropTypes from 'prop-types';


class SearchBar extends Component {
    render (){
        return (
            <div className="searchbar">
                <form action="http://www.google.com/search" method="get">
                    <input type="text" name="q"/>
                    <input type="submit" value="search" />
                </form>
            </div>
        );
    }
}

export default SearchBar;