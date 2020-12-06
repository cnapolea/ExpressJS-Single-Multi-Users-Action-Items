import React from 'react';
import {Grid} from '@material-ui/core'

import SearchBar from './SearchBar/SearchBar.jsx';
import ListDisplay from './ListsDisplay/ListDisplay.jsx'
import ListFormDisplay from './ListFormDisplay/ListFormDisplay.jsx';

function ListContainer(props){

    return (
        <Grid item xs={12} md={12}>
            <Grid container spacing={6}>
                {
                props.newListBtnClicked?
                <ListFormDisplay/>:
                <>
                    <SearchBar/>
                    <ListDisplay/>
                </>
                }
            </Grid>
          </Grid>
    )
}

export default ListContainer;