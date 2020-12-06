import React from 'react';
import {Grid, Typography} from '@material-ui/core'

import ListSearchForm from '../Forms/ListSearchForm/SearchForm';
import ActionList from './ActionListItem/ActionListItem.jsx';

function ListContainer(){
    return (
        <Grid item xs={12} md={12}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <ListSearchForm/>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant='h4'>Most Recent Lists</Typography>
                <ActionList/>
              </Grid>
            </Grid>
          </Grid>
    )
}

export default ListContainer;