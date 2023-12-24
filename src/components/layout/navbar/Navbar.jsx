/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { useContext, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { menuItems } from '../../../router/navigation';
import { logout } from '../../../firebaseConfig';
import { AuthContext } from '../../../context/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from '../../../../src/images/logo.png';
import { CartContext } from '../../../context/CartContext';

const drawerWidth = 200;

function Navbar(props) {
  const { cart, getTotalPrice } = useContext(CartContext);
  const { logoutContext, user } = useContext(AuthContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;
  const countStyles = {
    background: 'red',
    color: 'white',
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cartIconStyles = {
    fontSize: '30px',
  };

  const getInitials = (email) => {
    const emailParts = email.split('@');
    if (emailParts.length === 2) {
      const [username] = emailParts[0].split('.');
      return username.charAt(0).toUpperCase() + emailParts[1].charAt(0).toUpperCase();
    }
    return '';
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    logoutContext();
    navigate('/login');
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map(({ id, path, title, Icon }) => (
          <Link key={id} to={path}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon sx={{ color: 'whitesmoke' }} />
                </ListItemIcon>
                <ListItemText primary={title} sx={{ color: 'whitesmoke' }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}

        {user.rol === rolAdmin && (
          <Link to="/dashboard">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: 'whitesmoke' }} />
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} sx={{ color: 'whitesmoke' }} />
              </ListItemButton>
            </ListItem>
          </Link>
        )}

        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: 'whitesmoke' }} />
            </ListItemIcon>
            <ListItemText primary={'Cerrar sesión'} sx={{ color: 'whitesmoke' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          height: '100px',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {user && user.email && (
              <Avatar sx={{ bgcolor: '#ff4081', marginRight: '10px' }}>
                {getInitials(user.email)}
              </Avatar>
            )}
            <Link to="/" style={{ color: 'whitesmoke' }}>
              <div>
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    maxHeight: '80px',
                    maxWidth: 'auto',
                  }}
                />
              </div>
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <IconButton
              color="secondary.primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon color="secondary.primary" />
            </IconButton>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
              <div id="count" style={countStyles}>
                {cart.length}
              </div>
              <div id="cart">
                <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <IconButton color="secondary.primary" aria-label="carrito">
                    <ShoppingCartIcon style={cartIconStyles} />
                  </IconButton>
                </Link>
                <div>
                  <p style={{ color: 'white', fontWeight: 'bold' }}>${getTotalPrice()}</p>
                </div>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box component="nav" aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor="right"
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#1976d2',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          width: '100%',
          minHeight: '100vh',
          px: 2,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Navbar;
