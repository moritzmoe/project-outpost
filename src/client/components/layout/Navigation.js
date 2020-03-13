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

import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    position: 'absolute',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
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

export default function Navigation() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

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
          <ListItemText primary="Hey Moritz!" />
        </ListItem>
        <ListItem button onClick={() => setSelected(0)} selected={selected === 0} key="Home">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => setSelected(1)} selected={selected === 1} key="Timeline">
          <ListItemIcon><TimelineIcon /></ListItemIcon>
          <ListItemText primary="Timeline" />
        </ListItem>
        <ListItem button onClick={() => setSelected(2)} selected={selected === 2} key="Shopping">
          <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
          <ListItemText primary="Shopping" />
        </ListItem>
        <ListItem button onClick={() => setSelected(3)} selected={selected === 3} key="Friends">
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary="Friends" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => setSelected(4)} selected={selected === 4} key="Settings">
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={() => setSelected(null)} key="Logout">
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={() => setOpen(!open)} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Login
          </Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}
