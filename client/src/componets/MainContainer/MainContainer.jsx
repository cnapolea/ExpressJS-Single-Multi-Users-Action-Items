import React from 'react';
import clsx from 'clsx';
import {Grid, Divider, Drawer, AppBar, Toolbar, List, CssBaseline, Typography, IconButton, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';


import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListIcon from '@material-ui/icons/ListAlt';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {useStyles} from './styles.js';
import ListContainer from '../ActionList/ListContainer.jsx';


export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {"<Action Lists/>"}
          </Typography>
        </Toolbar>

      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['My Lists', 'Search'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <ListIcon /> : <SearchIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem button key='Add List'>
              <ListItemIcon><AddCircleIcon/></ListItemIcon>
              <ListItemText primary='Add List'/>
            </ListItem>
        </List>
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={0}>
          <ListContainer/>
          {/* <Grid item xs={12} md={6} >

          </Grid> */}
        </Grid>  
      </main>
    </div>
  );
}