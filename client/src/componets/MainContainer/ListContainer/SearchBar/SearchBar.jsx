import React from 'react';
import Grid from '@material-ui/core/Grid'

import ListSearchForm from '../../../Forms/ListSearchForm/SearchForm.jsx';

function SearchBar(){
    return (
        <Grid item xs={12}>
            <ListSearchForm/>
        </Grid>)
}

export default SearchBar;