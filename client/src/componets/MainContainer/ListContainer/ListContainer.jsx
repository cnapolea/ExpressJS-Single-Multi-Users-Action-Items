// jshint esversion:6

import React, {useState} from 'react';
import {Grid, Collapse} from '@material-ui/core';

import SearchBar from './SearchBar/SearchBar.jsx';
import ListDisplay from './ListsDisplay/ListDisplay.jsx';
import ListFormDisplay from './ListFormDisplay/ListFormDisplay.jsx';

import {useStyles} from './styles';

function ListContainer(props){

    const classes = useStyles();
    const [isSearching, setSearchStatus] = useState(false);
    
    const searchHandler = (e) => {
        const {value} = e.target;
        if(value==='') {
            setSearchStatus(false);
        } else {
            setSearchStatus(true);
        }

    };

    return (
        <Grid item xs={12} md={12}>
            <Grid container spacing={6}>
                {
                props.newListBtnClicked?
                    <ListFormDisplay cancelBtnHandler={props.cancelBtnHandler}
                        newListBtnClicked={props.newListBtnClicked}
                    />:
                <>
                    <SearchBar searchHandler={searchHandler}
                        bottomPadding = {isSearching&&0}
                    />
                    <Grid item md={12} className={classes.listFoundGrid}>
                        <Collapse in={isSearching} timeout={1000}>
                            <ul className={classes.listsFoundContainer}>
                                <li>List 1</li>
                                <li>List 2</li>
                                <li>List 3</li>
                            </ul>
                        </Collapse>
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