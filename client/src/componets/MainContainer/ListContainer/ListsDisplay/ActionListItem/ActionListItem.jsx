import React from 'react';
import {Grid, List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core/';

import EditIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/DeleteRounded';

import useStyles from './styles.js';

function ActionList(props){

    const classes = useStyles();
    
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    
    const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    };

    return(
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItem
                button
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}>
                    <ListItemText primary={props.name} />
                    <ListItemIcon>
                        <Grid container spacing={1}>
                            <Grid item>
                                <EditIcon/>    
                            </Grid>
                            <Grid item>
                                <DeleteIcon button="true"/>
                            </Grid>
                        </Grid>
                    </ListItemIcon>
                </ListItem>
            </List>
        </div>
    )
}

export default ActionList;