// jshint esversion:6

import React from 'react';
import {Grid, Collapse, List, ListItem} from '@material-ui/core';

import {useStyles} from './styles';


export const ListDropDown = (props) => {
    const classes = useStyles();
    
    return (
        <Grid item md={12} className={classes.listFoundGrid}>
            <Collapse in={props.searchStatus} timeout={1000}>
                <List className={classes.listsFoundContainer}>
                    <ListItem>Lis1 1</ListItem>
                </List>
            </Collapse>
        </Grid>
    )
};

