// jshint esversion:6

import React from 'react';
import {Grid} from '@material-ui/core';

import SearchBar from './SearchBar/SearchBar.jsx';
import ListDisplay from './ListsDisplay/ListDisplay.jsx';
import ListFormDisplay from './ListFormDisplay/ListFormDisplay.jsx';

import {useStyles} from './styles';

function ListContainer(props){

    const classes = useStyles();

    return (
        <Grid item xs={12} md={12}>
            <Grid container spacing={6}>
                {
                props.newListBtnClicked?
                    <ListFormDisplay cancelBtnHandler={props.cancelBtnHandler}
                        newListBtnClicked={props.newListBtnClicked}
                    />:
                <>
                    <SearchBar/>
                    <Grid item md={12} className={classes.listFoundGrid}>
                    <ul className={classes.listsFoundContainer}>
                        <li>List 1</li>
                        <li>List 2</li>
                        <li>List 3</li>
                    </ul>
                    </Grid>
                    
                    <ListDisplay
                        listSelected = {props.listSelected}
                    />
                </>
                }
            </Grid>
          </Grid>
    )
}

export default ListContainer;