import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Routes from './routes'

window.localStorage.setItem('token', 'token')

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
