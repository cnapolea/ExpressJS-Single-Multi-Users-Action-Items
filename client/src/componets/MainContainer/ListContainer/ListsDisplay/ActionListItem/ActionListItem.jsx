import React, {useState, useEffect} from 'react';
import {Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core/';

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
                        <IconButton onClick={()=>alert('Hello')}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </div>
    )
}

export default ActionList;