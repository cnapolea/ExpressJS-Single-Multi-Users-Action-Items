import React from 'react';
import ReactDOM from 'react-dom';

import App from './componets/App';
import createList from './api/createList.js'

ReactDOM.render( <App createList={createList}/>,document.getElementById('root')
);
