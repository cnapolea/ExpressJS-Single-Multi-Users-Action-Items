// jshint esversion:6

import React from 'react';
import Grid from '@material-ui/core/Grid';

import ListSearchForm from '../../../Forms/ListSearchForm/SearchForm.jsx';
import { useStyles } from './styles';

function SearchBar(){

    const classes= useStyles();

    return (
        <Grid item xs={12}>
            <ListSearchForm className={classes.root}/>
        </Grid>)
}

export default SearchBar;