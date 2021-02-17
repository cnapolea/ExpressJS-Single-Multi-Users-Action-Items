//jshint esversion:10

import React from 'react';
import Typography from '@material-ui/core/Typography';

function Header(props){
    return (<Typography variant='h4'>{props.title}</Typography>)
}

export default Header;