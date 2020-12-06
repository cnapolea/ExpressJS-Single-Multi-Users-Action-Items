import React from 'react';
import {Grid, Slide} from '@material-ui/core';

import Heading from './Header.jsx';
import ActionList from './ActionListItem/ActionListItem';


function ListDisplay(){
    return (
        <Slide in direction='right' timeout={{enter:1500, exit:1500}}>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Heading/>
                    </Grid>
                    <Grid item xs={12}>
                        <ActionList/>
                    </Grid>
                </Grid>
            </Grid>
        </Slide>)
}

export default ListDisplay;