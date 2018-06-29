import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import Routes from './routes'
import reducers from './store/reducers'
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(
  multi,
  thunk,
  promise
)(createStore)(reducers, devTools)

ReactDOM.render(
  <Provider store={ store }>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
