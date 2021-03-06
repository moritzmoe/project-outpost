import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Ballot from '@material-ui/icons/Ballot';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorageIcon from '@material-ui/icons/Storage';
import TimelineIcon from '@material-ui/icons/Timeline';
import React, { useEffect, useState } from 'react';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';
import RouterHistory from '../Tools/RouterHistory';
import InformationDialog from './InformationDialog';


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
    color: theme.palette.primary.dark,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  infoButton: {
    position: 'absolute',
    right: theme.spacing(2)
  }
}));


export default function Navigation(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Login');
  const pageName = useStoreValue('pageName', 'Project Outpost');
  const userFirstname = useStoreValue('userFirstname');
  const isAdmin = useStoreValue('isAdmin');
  const setIsAdmin = useSetStoreValue('isAdmin');

  const isOwner = useStoreValue('isOwner');
  const setIsOwner = useSetStoreValue('isOwner');
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  useEffect(() => {
  }, []);

  const logout = () => {
    setSelected('Login');
    props.isLoggedIn(false);
    setIsAdmin(false);
    setIsOwner(false);
    RouterHistory.push('/login');
  };

  const toggleDrawer = bool => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(bool);
  };

  const handleInformationDialogOpen = () => {
    setInfoDialogOpen(true);
  };

  const handleInfoDialogClose = () => {
    setInfoDialogOpen(false);
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
          <Typography variant="h5">
            {`Hey ${userFirstname}!`}
          </Typography>
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
      </List>
      { isAdmin ? (
        <>
          <Divider />
          <List subheader={<ListSubheader>Du bist ein Administrator:</ListSubheader>}>
            <ListItem button onClick={() => { setSelected('Item Database'); RouterHistory.push('/items'); }} selected={selected === 'Item Database'} key="Items">
              <ListItemIcon><StorageIcon /></ListItemIcon>
              <ListItemText primary="Produktdatenbank" />
            </ListItem>
            <ListItem button onClick={() => { setSelected('User Management'); RouterHistory.push('/users'); }} selected={selected === 'User Management'} key="Users">
              <ListItemIcon><RecentActorsIcon /></ListItemIcon>
              <ListItemText primary="Nutzerverwaltung" />
            </ListItem>
            <ListItem button onClick={() => { setSelected('Category Management'); RouterHistory.push('/categories'); }} selected={selected === 'Category Management'} key="Categories">
              <ListItemIcon><Ballot /></ListItemIcon>
              <ListItemText primary="Kategorien" />
            </ListItem>
          </List>
        </>
      ) : ''}
      { isOwner ? (
        <>
          <Divider />
          <List subheader={<ListSubheader>Du bist ein Owner:</ListSubheader>}>
            <ListItem button onClick={() => { setSelected('Owner Settings'); RouterHistory.push('/ownersettings'); }} selected={selected === 'Owner Settings'} key="OwnerSettings">
              <ListItemIcon><StorageIcon /></ListItemIcon>
              <ListItemText primary="Owner Einstellungen" />
            </ListItem>
          </List>
        </>
      ) : ''}
      <Divider />
      <List>
        <ListItem button onClick={() => { setSelected('Settings'); RouterHistory.push('/settings'); }} selected={selected === 'Settings'} key="Settings">
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Einstellungen" />
        </ListItem>
        <ListItem button onClick={() => logout()} key="Logout">
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Ausloggen" />
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
            {pageName}
          </Typography>
          <IconButton aria-label="info" color="inherit" className={classes.infoButton} variant="extended" onClick={handleInformationDialogOpen}>
            <InfoIcon />
          </IconButton>
          <InformationDialog isOpen={infoDialogOpen} handleClose={handleInfoDialogClose} />
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
