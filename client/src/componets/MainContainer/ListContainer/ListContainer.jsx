// jshint esversion:10

import React, { useState, useReducer, useEffect} from "react";
import { Grid } from "@material-ui/core";

import ListsAPI from '../../../api/listsAPI.js';

import SearchBar from "./SearchBar/SearchBar.jsx";
import ListDisplay from "./ListsDisplay/ListDisplay.jsx";
import ListFormDisplay from "./ListFormDisplay/ListFormDisplay.jsx";

function ListContainer(props) {
  
  const [isSearching, setSearchStatus] = useState(false);
 
  const [apiData, setApiData] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING_DATA':
        return {...state, fetching:true};
      case 'FETCHING_DATA_SUCCESS':
        return {...state, fetching:false, status:'success', data: action.data};
      case 'FETCHING_DATA_FAILURE':
        return {...state, fetching:false, status:'failure'};  
 
      default:
        break;
    } 
  }, {data:false});

  useEffect(()=>{
    setApiData({type:'FETCHING_DATA'});
    ListsAPI.getLists(setApiData);
  },[]);

  function deleteListHandle (name, listId){
        
    const confirmation = window.confirm(`You are about to delete ${name} action list. Press confirm to proceed.`);

        if(confirmation) {
            setApiData({type:'FETCHING_DATA'});
            ListsAPI.deleteList(listId);
            ListsAPI.getLists(setApiData);
        }
    
}

function updateListNameHandle (listId, data) {
    const confirmation = window.confirm('You are renaming this list. Should we proceed?');

    if (confirmation) {
        setApiData({type:'FETCHING_DATA'});
        ListsAPI.updateList(listId, data);
        ListsAPI.getLists(setApiData);
        document.location.reload();
    }
}


  const searchHandler = (e) => {
    const { value } = e.target;
    if (value === "") {
      setSearchStatus(false);
    } else {
      setSearchStatus(true);
    }
  };

  return (
    <Grid item xs={12} md={12}>
      <Grid container spacing={6}>
        {props.newListBtnClicked ? (
          <ListFormDisplay
            cancelBtnHandler={props.cancelBtnHandler}
            newListBtnClicked={props.newListBtnClicked}
          />
        ) : (
          <>
            <SearchBar
              searchHandler={searchHandler}
              bottomPadding={isSearching && 0}
              searchStatus={isSearching}
            />

            <ListDisplay 
              listSelected={props.listSelected} 
              lists={apiData}
              deleteList={deleteListHandle}
              updateList={updateListNameHandle}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default ListContainer;
