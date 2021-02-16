// jshint esversion:8

import React, {useState} from 'react';
import clsx from 'clsx';
import {Grid, Divider, Drawer, AppBar, Toolbar, List, CssBaseline, Typography, IconButton, ListItem, ListItemText, ListItemIcon, Slide} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';


import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListIcon from '@material-ui/icons/ListAlt';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';


import {useStyles} from './styles.js';
import ListContainer from './ListContainer/ListContainer.jsx'


export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line
  const [isHome, setIsHome] = useState(false);
  const [newListBtnClicked, setNewListBtnClicked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [notSelected, setNotSelected] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const goHomeHandler = async () => {
    setIsHome(true);
    setNewListBtnClicked(false);
  };

  const handleNewListBtnClick = () => {
    setNewListBtnClicked(true);
  }

  const listSelectedHandler = () => {
    setIsSelected(prev => !prev);
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
            Nizzer
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
          <ListItem button onClick={goHomeHandler}>
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          
          <ListItem button >
            <ListItemIcon><ListIcon/></ListItemIcon>
            <ListItemText primary='My Lists' />
          </ListItem>

          <ListItem button key='Add List' onClick={()=> handleNewListBtnClick()}>
              <ListItemIcon><AddCircleIcon/></ListItemIcon>
              <ListItemText primary='Add List'/>
            </ListItem>
        </List>
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
        <Grid container spacing={0}>
          <Grid item xs={12} md={isSelected?6:12}>
            <ListContainer 
              newListBtnClicked={newListBtnClicked}
              listSelected = {listSelectedHandler}
              cancelBtnHandler={goHomeHandler}
            />
          </Grid >
          <Slide in={isSelected} direction="left">
            <Grid item md={6}>
              {/* <h1>Actions</h1> */}
            </Grid>
          </Slide>
        
        </Grid>
          
          
      </main>
    </div>
  );
}