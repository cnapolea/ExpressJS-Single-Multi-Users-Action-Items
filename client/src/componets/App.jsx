import React from 'react';
import {Container} from '@material-ui/core';

import MainContainer from './MainContainer/MainContainer.jsx';

function App(props) {
  return (
    <Container maxWidth='lg'>
      <MainContainer listsAPI={props.listsAPI}/>
      
    </Container>
  );
}

export default App;
