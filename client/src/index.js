import React from 'react';
import ReactDOM from 'react-dom';

import App from './componets/App';
import listsAPI from './api/listsAPI.js'


// We are passing the functions that will make the requests to the REST API into out app component

ReactDOM.render( <App listsAPI={listsAPI}/>,document.getElementById('root')
);
