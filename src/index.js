import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import { Provider } from 'react-redux';
import store from './js/store/index';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    //Provider wraps up your React application and makes it aware of the entire Redux’s store
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));
/*
TypeError: Request scheme 'chrome-extension' is unsupported

This is what I'd expect if you attempt to register a service worker that intercepts requests 
for chrome-extension: URLs. The service worker can't respond to to those types of requests, 
and there's an error logged suggesting as much.

Chrome has its own approach to installing/caching the resources needed to display a Chrome 
Extension. Service workers don't fit into that picture.

The message in the console can be safely ignored (it's not going to affect your extension's 
functionality), and to prevent it from showing up in the future, you can modify your index.js 
to remove the registerServiceWorker() call. */
//registerServiceWorker();
