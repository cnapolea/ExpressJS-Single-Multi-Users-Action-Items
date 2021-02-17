// jshint esversion:6

import React from "react";
import {Grid, Collapse} from "@material-ui/core";

import ListSearchForm from "../../../Forms/ListSearchForm/SearchForm.jsx";
import { ListDropDown } from "./SearchListDropDown";
import { useStyles } from "./styles";

function SearchBar(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} style={{ paddingBottom: props.bottomPadding }}>
      <ListSearchForm
        className={classes.root}
        searchHandler={props.searchHandler}
      />
      <Collapse in={props.searchStatus} timeout={500}>
        <ListDropDown searchStatus={props.searchStatus}/>
      </Collapse>
      
    </Grid>
  );
}

export default SearchBar;