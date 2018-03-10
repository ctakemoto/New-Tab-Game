// src/js/store/index.js
import { createStore } from 'redux';
import rootReducer from '../reducers/index';
//function for creating the Redux store.
/*createStore takes a reducer as the first argument, rootReducer in our case.

You may also pass an initial state to createStore. But most of the times you don’t have to. 
Passing an initial state is useful for server side rendering. 
Anyway, the state comes from reducers. */
const store = createStore(rootReducer);
export default store;