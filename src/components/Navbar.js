import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useAppStore } from "../appStore";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext"
import { useContext } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const AppBar = styled(MuiAppBar, {
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));







export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);
  const navigate = useNavigate();
  const { dispatch, currentUser } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [profileOpen, setProfileOpen] = useState(false)
  

  useEffect(() => {
    // Lorsque l'utilisateur est authentifié, récupérez le nom associé à son ID d'utilisateur
    if (currentUser) {
      const userId = currentUser.uid;
      let userName = "";

      // Vous pouvez définir ici une liste d'ID et de noms associés
      const userMappings = {
        "bFRX1O7KZ9RUll5WBrL6aNPKjtC2": "Bariky Sidi Oumar",
        "vfP330RPvFXz0e8R9oOoIFXAIX33": "Hendou Dah",
        "7qavQD5gRlPkW1XbqRRPMigLe052": "Cheikani Bechir",
        "oy2mL7D51BPq4UZZKe6nTo7MX6Q2": "Lehbib Sidi Oumar",
      };

      if (userMappings[userId]) {
        userName = userMappings[userId];
      }

      setUserName(userName);
    }
  }, [currentUser]);

  const handleProfileClick = () => {
    setProfileOpen(true);
    handleMenuClose();
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Après une déconnexion réussie
        dispatch({ type: "LOGOUT" });
        navigate("/login"); // Utilisez replace: true
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion :", error);
      });
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
    
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            PMP
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {profileOpen && (
        <Dialog open={profileOpen} onClose={handleProfileClose}>
          <DialogTitle>Profile</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Nom: {userName}
            </DialogContentText>
            <DialogContentText>
              Email: {currentUser.email}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleProfileClose} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
