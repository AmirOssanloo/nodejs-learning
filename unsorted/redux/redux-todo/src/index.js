import React, { Component } from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import configureStore from './configureStore';

const store = configureStore();

// Render the app
render(
  <Root store={store} />,
  document.getElementById('root')
);

// TODO:
// https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers
