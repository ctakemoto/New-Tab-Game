import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import { Provider } from 'react-redux';
import store from './js/store/index';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    //Provider wraps up your React application and makes it aware of the entire Redux’s store
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
