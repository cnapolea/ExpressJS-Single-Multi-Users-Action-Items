import React from 'react';
import TextField from '@material-ui/core/TextField';

function ListSearchForm(){
    return (
        <form onSubmit={e => e.preventDefault()}>
            <TextField
               id="standard-full-width"
               placeholder="Look For A List"  
               fullWidth
               margin="normal"
               InputLabelProps={{shrink: true,}}/>
            </form>
    )
}

export default ListSearchForm;