import React from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core/';

import useStyles from './styles.js';

function ActionList(){

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
                <ListItemText primary="ListName" />
                </ListItem>
            </List>
        </div>
    )
}

export default ActionList;