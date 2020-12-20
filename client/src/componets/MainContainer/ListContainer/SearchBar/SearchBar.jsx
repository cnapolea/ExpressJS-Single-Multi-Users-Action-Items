// jshint esversion:6

import React from 'react';
import Grid from '@material-ui/core/Grid';

import ListSearchForm from '../../../Forms/ListSearchForm/SearchForm.jsx';
import { useStyles } from './styles';

function SearchBar(props){

    const classes= useStyles();

    return (
        <Grid item xs={12} style={{paddingBottom:props.bottomPadding}}>
            <ListSearchForm 
                className={classes.root}
                searchHandler={props.searchHandler}
            />
        </Grid>)
}

export default SearchBar;