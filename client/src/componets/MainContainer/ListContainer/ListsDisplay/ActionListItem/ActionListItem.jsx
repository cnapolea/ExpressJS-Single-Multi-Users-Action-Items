import React, {useState, useReducer} from 'react';
import {List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Zoom} from '@material-ui/core/';

import EditIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import ConfirmIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/CancelOutlined';

import useStyles from './styles.js';

function ActionList(props){

    const classes = useStyles();
    
    // Capture state change of edit input field
    const [updatedListName, setListName] = useState();
    
    // Checks if the list selected was clicked or not
    const [listIsClicked, setListIsClicked] = useState();
    
    const [edit, setEditOn] =  useReducer((currentState, action) => {
        // This reducer controls the state of the edit input field
        switch (action.type) {
            case 'EDIT_FIELD':
                return {...currentState, btnClicked:true}
                ;
            case 'CANCEL_EDIT': 
                return {...currentState, btnClicked:false};
            case 'MAKE_UPDATE':
                return {...currentState, btnClicked:false};
            default:
                break;
        }
    }, {btnClicked:false});
    
    const handleListItemClick = () => {
        setListIsClicked(prev => !prev);
    };

    const editClickHandler = () => {
        setEditOn({type:'EDIT_FIELD'});
    };

    const cancelEditHandler = () => {
        setEditOn({type:'CANCEL_EDIT'});
    };

    const confirmEditHandler = (e) => {
        const [newName] = e.target.value;
        setListName(newName);
    };

    return(
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItem button selected={listIsClicked} onClick={handleListItemClick}>
                    {edit.btnClicked?
                        <input className={classes.editInput} name="editInput" type="text" placeholder={props.name} onChange={(e) => console.log(e.target.value)} value={updatedListName} autoFocus/>:
                        <ListItemText primary={props.name}/>
                    }
                    
                    <ListItemSecondaryAction>    
                        {edit.btnClicked?
                            <IconButton><ConfirmIcon/></IconButton>:
                            <IconButton onClick={editClickHandler}><EditIcon/></IconButton>
                        }
                        {edit.btnClicked?
                            <IconButton onClick={cancelEditHandler}><CancelIcon/></IconButton>:
                            <IconButton onClick={() => props.deleteHandler(props.name, props.id)}><DeleteIcon/></IconButton>
                        }
                        
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </div>
    )
}

export default ActionList;