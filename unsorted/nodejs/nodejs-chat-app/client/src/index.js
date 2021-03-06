import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import socket from './socket/socket';
import store from './store/store';
import App from './containers/app/App';
import './index.css';

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>), document.getElementById('root')
);