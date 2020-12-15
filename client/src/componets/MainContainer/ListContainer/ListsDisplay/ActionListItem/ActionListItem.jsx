import React, {useState, useReducer} from 'react';
import {List, ListItem, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core/';

import EditIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import ConfirmIcon from '@material-ui/icons/CheckCircleOutlined';

import useStyles from './styles.js';

function ActionList(props){

    const classes = useStyles();
    
    const [listIsClicked, setListIsClicked] = useState();
    
    const [edit, setEditOn] =  useReducer((currentState, action) => {
        switch (action.type) {
            case 'EDIT_FIELD':
                return {...currentState, btnClicked:true}
                ;
            case 'CANCE_EDIT': 
                return {...currentState, btnClicked:false};
            case 'MAKE_UPDATE':
                return {...currentState, btnClicked:false};
            default:
                break;
        }
    }, {editClicked:false});
    
    const handleListItemClick = () => {
        setListIsClicked(prev => !prev);
    };

    const editClickHandler = () => {
        setListIsClicked({type:'EDIT_FIELD'})
    }

    return(
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItem
                button
                selected={listIsClicked}
                onClick={() => handleListItemClick()}>
                    {edit.btnClicked?<input className={classes.editInput} name="editInput" type="text" placeholder={props.name} autoFocus/>:<ListItemText primary={props.name}/>}
                    
                    
                    <ListItemSecondaryAction>
                        <IconButton>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => props.deleteHandler(props.name, props.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </div>
    )
}

export default ActionList;