// jshint esversion:10

import React from 'react';
import {Grid, Slide} from '@material-ui/core';

import Heading from '../../Header.jsx';
import ActionList from './ActionListItem/ActionListItem';


function ListDisplay(props){
            
    return (
        <Slide in direction='right' timeout={{enter:2000}}>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Heading 
                            title = {'Most Recent Lists'}
                        />
                    </Grid>
                    {props.lists.status==='success'?props.lists.data.map((list, i) => 
                        <Grid key={list._id} item xs={12}>
                            <ActionList
                                key={i}
                                id={list._id}
                                name={list.name}
                                description={list.description}
                                deleteHandler = {props.deleteList}
                                updateHandler = {props.updateList}
                                listSelected = {props.listSelected}
                            />
                        </Grid>
                    ):<h1>No Lists</h1>}
                </Grid>
            </Grid>
        </Slide>
    )
    
}

export default ListDisplay;
