import React, { useEffect, useReducer} from 'react';
import {Grid, Slide} from '@material-ui/core';

import Heading from './Header.jsx';
import ActionList from './ActionListItem/ActionListItem';


import ListsAPI from '../../../../api/listsAPI.js';

function ListDisplay(props){

    const [actionLists, setActionLists] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'FETCHING_DATA':
                    return {...state, fetchingList: true};
                case 'FETCHING_DATA_SUCESS':
                    return {...state, fetchingList:false, data:action.data};
                case 'FATCHING_DATA_FAILURE': 
                    return {...state, fetchingList:false}
                default:
                    break;
            }
    }, {data:null})
    
    function deleteListHandle (name, listId){
        
        const confirmation = window.confirm(`You are about to delete ${name} action list. Press confirm to proceed.`);

            if(confirmation) {
                setActionLists({type:'FETCHING_DATA'});
                ListsAPI.deleteList(listId);
                ListsAPI.getLists(setActionLists);
            }
        
    }
    
    function updateListNameHandle (listId, data) {
        const confirmation = window.confirm('You are renaming this list. Should we proceed?');

        if (confirmation) {
            setActionLists({type:'FETCHING_DATA'});
            ListsAPI.updateList(listId, data);
            ListsAPI.getLists(setActionLists);
            document.location.reload();
        }
    }
    
    useEffect(() => {
        setActionLists({type:'FETCHING_DATA'});
        ListsAPI.getLists(setActionLists);
    },[]);
    
    return (
        <Slide in direction='right' timeout={{enter:1500, exit:1500}}>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Heading/>
                    </Grid>
                    {actionLists.data && !actionLists.fetchingList?actionLists.data.map((list, i) => 
                        <Grid key={list._id} item xs={12}>
                            <ActionList
                            key={i}
                            id={list._id}
                            name={list.name}
                            description={list.description}
                            deleteHandler = {deleteListHandle}
                            updateHandler = {updateListNameHandle}
                            listSelected = {props.listSelected}
                            />
                        </Grid>
                    ):null}
                </Grid>
            </Grid>
        </Slide>
    )
    
}

export default ListDisplay;
