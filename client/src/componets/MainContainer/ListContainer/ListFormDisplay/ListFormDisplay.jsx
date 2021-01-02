//jshint esversion:6

import React from 'react';
import {Grid, Slide} from '@material-ui/core'

import NewListHeader from './NewListHeader.jsx';
import NewListForm from '../../../Forms/NewListForm/newListForm'


function ListFormDisplay(props){
    return(
        <Slide in direction='left' timeout={{enter:1500, exit:1500}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <NewListHeader/>
                </Grid>
                <Grid item xs={12}>
                    <NewListForm 
                        cancelBtnHandler={props.cancelBtnHandler}
                        createList={props.createList}
                    />
                </Grid>
            </Grid>
        </Slide>
    )
}

export default ListFormDisplay;