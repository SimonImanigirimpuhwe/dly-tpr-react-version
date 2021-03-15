import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotifacationIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import logo from '../../assets/images/logo.png';
import profile from '../../assets/images/profile.png';
import menu from '../../helpers/Menu';
import Dashboard from '../Dashboard';
import { Grid } from '@material-ui/core';
import { AuthContext } from '../../context/contexts/AuthContext';
import LoginAdmin from '../Login';
import AddAdmin from '../CreateAdmin';
import AddUser from '../CreateUser';
import Report from '../Report';
import UserContextProvider from '../../context/contexts/UserContext';
import UserPage from '../Student';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import toaster from '../../helpers/toast';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  logo: {
      width: 30,
      height: 30,
  },
  profile: {
      width: 30,
      height: 30
  },
  username: {
    textTransform: 'capitalize'
  },
  icons: {
    color: '#2196F3',
  }
}));


function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard")
  
  const { auth } = useContext(AuthContext);
  const token = localStorage.getItem('AdminToken');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ToastContainer 
      draggable={true} 
      transition={Zoom} 
      autoClose={3000} 
      position={toast.POSITION.TOP_CENTER}
      />
      <CssBaseline />
      <AppBar position="fixed" style={{background: '#2196F3',}}>
        <Toolbar className={classes.toolbar} >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon /> 
            </IconButton>     
            <img src={logo} alt="logo" className={classes.logo}/>
            <div style={{marginLeft: 'auto'}}>
                <Badge badgeContent={7} color="secondary" style={{marginRight: 20}}>
                    <NotifacationIcon />
                </Badge>
                <Button disabled>
                <img src={profile} alt="profile" className={classes.profile}/>
                </Button>
                <Button style={{color: 'white',}}>
                    <Typography variant="subtitle1" color="inherit" className={classes.username}>
                        {auth.user.username || localStorage.getItem('username') || 'John Doe'}
                    </Typography>
                </Button>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu.map((link, index) => (
            <ListItem button key={index} onClick={() => {
              if (link.name === 'Logout') {
                localStorage.removeItem('AdminToken') || localStorage.removeItem('UserToken');
                localStorage.removeItem('username')
                toaster('Logged out successfully', 'success');
                setTimeout(() => {
                  location.reload()
                }, 3000);
              } else {
                setActiveMenu(link.name)
              }
              }}>
              <ListItemIcon className={classes.icons}>{<link.icon />}</ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {activeMenu === "Dashboard" &&(
        <>
        <Grid container spacing={2}>
          <Dashboard />
        </Grid>
        </>
        )} 
        {activeMenu === "Add Admin" && <AddAdmin />}
        {activeMenu === 'Add User' && <UserContextProvider><AddUser /></UserContextProvider> }  
        {activeMenu === 'Report' && <Report token={token}/>} 
        {activeMenu === 'Users' && <UserPage />}  
      </main>
    </div>
  );
}

export default () => {
  const { auth } = useContext(AuthContext)
  const {token} = auth;
  const AdminToken = token || localStorage.getItem("AdminToken");
  if (AdminToken )return <PersistentDrawerLeft /> 
  return <LoginAdmin />
}

