import React from 'react';
import {TextField, Button} from '@material-ui/core';

import ListsAPI from '../../../api/listsAPI.js';
import useStyles from './styles.js'

function NewListForm(props){
    const classes = useStyles();
    const [listName, setListName] = React.useState('');
    const [descriptionValue, setDescriptionValue] = React.useState('');
  
    const handleListNameChange = e => {setListName(e.target.value);};

    const handleDescriptionChange = e => {setDescriptionValue(e.target.value);};
    
    const handleFormSubmission = async () => {
        // console.log('I was clicked');
        if(listName === '' || descriptionValue === '') {
            alert("You must fill in the Name and Description field.");
        } else {
            const listData = await {
                name: listName,
                description: descriptionValue
            };

            ListsAPI.createList(listData);            
            props.cancelBtnHandler();
        }
    };

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
            <div>
                <TextField required id="standard-required" label="Action List's Name" className={classes.listNameInput} name="name" value={listName} onChange={handleListNameChange}/>
            </div>
            <div>
                <TextField
                    id="outlined-multiline-flexible"
                    label="List Description"
                    multiline
                    rowsMax={4}
                    value={descriptionValue}
                    onChange={handleDescriptionChange}
                    variant="outlined"
                    name="description"
                /> 
                <br/>
                <div className={classes.formButtons}>
                    <Button className={classes.createBtn} variant="contained" onClick={handleFormSubmission}>Create</Button>
                    <Button className={classes.cancelBtn} variant="outlined" onClick={props.cancelBtnHandler}>Cancel</Button>
                </div>
            </div>

        </form>
    )
}

export default NewListForm;