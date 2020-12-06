import React from 'react';
import {TextField, Button} from '@material-ui/core';

import useStyles from './styles.js'


function NewListForm(props){
    const classes = useStyles();
    const [value, setValue] = React.useState('');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
            <div>
                <TextField required id="standard-required" label="Action List's Name" className={classes.listNameInput}/>
            </div>
            <div>
                <TextField
                    id="outlined-multiline-flexible"
                    label="List Description"
                    multiline
                    rowsMax={4}
                    value={value}
                    onChange={handleChange}
                    variant="outlined"
                /> <br/>
                <div className={classes.formButtons}>
                    <Button className={classes.createBtn} variant="contained">Create</Button>
                    <Button className={classes.cancelBtn} variant="outlined" onClick={props.cancelBtnHandler}>Cancel</Button>
                </div>
            </div>

        </form>
    )
}

export default NewListForm;