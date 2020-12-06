import React from 'react';
import Grid from '@material-ui/core/Grid';

import Heading from './Header.jsx';
import ActionList from './ActionListItem/ActionListItem';


function ListDisplay(){
    return (
        <Grid item xs={12}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Heading/>
                </Grid>
                <Grid item xs={12}>
                    <ActionList/>
                </Grid>
            </Grid>
        </Grid>)
}

export default ListDisplay;