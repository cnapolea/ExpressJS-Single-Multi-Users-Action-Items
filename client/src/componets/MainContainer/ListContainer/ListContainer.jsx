// jshint esversion:6

import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import SearchBar from "./SearchBar/SearchBar.jsx";
import ListDisplay from "./ListsDisplay/ListDisplay.jsx";
import ListFormDisplay from "./ListFormDisplay/ListFormDisplay.jsx";

function ListContainer(props) {
  const [isSearching, setSearchStatus] = useState(false);

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

            <ListDisplay listSelected={props.listSelected} />
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default ListContainer;
