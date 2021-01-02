// jshint esversion:6

import React from 'react';
import TextField from '@material-ui/core/TextField';

function ListSearchForm(props){
    return (
        <form onSubmit={e => e.preventDefault()}>
            <TextField
               id="standard-full-width"
               placeholder="Look For A List"  
               fullWidth
               margin="normal"
               style={{marginBottom:0}}
               InputLabelProps={{shrink: true,}}
               onChange={(e)=> props.searchHandler(e)}        
            />
        </form>
    )
}

export default ListSearchForm;