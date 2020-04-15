/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';

import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import StorageIcon from '@material-ui/icons/Storage';
import RouterHistory from '../Tools/RouterHistory';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    position: 'absolute'
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
  profileSection: {
    backgroundColor: theme.palette.primary.light,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  }
}));


export default function Navigation(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Login');


  const logout = () => {
    setSelected('Login');
    props.isLoggedIn(false);
    RouterHistory.push('/login');
  };

  const toggleDrawer = bool => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(bool);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem key="User" className={classes.profileSection}>
          <Avatar className={classes.large}>
            <PersonIcon />
          </Avatar>
        </ListItem>
        <ListItem button onClick={() => { setSelected('Home'); RouterHistory.push('/'); }} selected={selected === 'Home'} key="Home">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => { setSelected('Timeline'); RouterHistory.push('/timeline'); }} selected={selected === 'Timeline'} key="Timeline">
          <ListItemIcon><TimelineIcon /></ListItemIcon>
          <ListItemText primary="Timeline" />
        </ListItem>
        <ListItem button onClick={() => { setSelected('Shopping'); RouterHistory.push('/shopping'); }} selected={selected === 'Shopping'} key="Shopping">
          <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
          <ListItemText primary="Shopping" />
        </ListItem>
        <ListItem button onClick={() => { setSelected('Friends'); RouterHistory.push('/friends'); }} selected={selected === 'Friends'} key="Friends">
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary="Friends" />
        </ListItem>
      </List>
      <Divider />
      <List subheader={<ListSubheader>Logged in as Administrator:</ListSubheader>}>
        <ListItem button onClick={() => { setSelected('Item Database'); RouterHistory.push('/items'); }} selected={selected === 'Item Database'} key="Items">
          <ListItemIcon><StorageIcon /></ListItemIcon>
          <ListItemText primary="Item Database" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => { setSelected('Settings'); RouterHistory.push('/settings'); }} selected={selected === 'Settings'} key="Settings">
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={() => logout()} key="Logout">
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          { props.loggedIn ? (
            <IconButton edge="start" onClick={() => setOpen(!open)} className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          ) : '' }
          <Typography variant="h6" className={classes.title}>
            {props.pageName}
          </Typography>
        </Toolbar>
      </AppBar>
      { props.loggedIn ? (
        <SwipeableDrawer
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {sideList('left')}
        </SwipeableDrawer>
      ) : ''}
    </div>
  );
}
