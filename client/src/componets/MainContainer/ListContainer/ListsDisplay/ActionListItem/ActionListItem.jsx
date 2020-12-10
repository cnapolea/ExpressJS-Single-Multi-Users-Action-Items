import React, {useState} from 'react';
import {List, ListItem, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core/';

import EditIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/DeleteRounded';

import useStyles from './styles.js';

function ActionList(props){

    const classes = useStyles();
    
    const [listIsClicked, setListIsClicked] = useState();
    
    const handleListItemClick = () => {
        setListIsClicked(prev => !prev);
    };

    return(
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItem
                button
                selected={listIsClicked}
                onClick={() => handleListItemClick()}>
                    <ListItemText primary={props.name} />
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