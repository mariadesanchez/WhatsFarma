/* eslint-disable no-unused-vars */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
// import Avatar from '@mui/material/Avatar';
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { menuItems } from "../../../router/navigation";
import { logout } from "../../../firebaseConfig";
import { AuthContext } from "../../../context/AuthContext";
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from '../../../../src/images/logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from "../../../context/CartContext";

const drawerWidth = 200;

function Navbar(props) {
  const { cart, getTotalPrice} = useContext(CartContext);
  const { logoutContext, user } = useContext(AuthContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN
  const countStyles = {
    background: 'red', // Fondo rojo
    color: 'white', // Texto blanco
    width: '25px', // Ancho
    height: '25px', // Altura
    borderRadius: '50%', // Forma de círculo
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cartIconStyles = {
    fontSize: '30px', // Tamaño del icono, puedes ajustar el valor según tu preferencia
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    logoutContext();
    navigate("/login");
  };

  const drawer = (
    <div>
      <Toolbar />

      <List>
        {menuItems.map(({ id, path, title, Icon }) => {
          return (
            <Link key={id} to={path}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon sx={{ color: "whitesmoke" }} />
                  </ListItemIcon>
                  <ListItemText primary={title} sx={{ color: "whitesmoke" }} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}

{
  user.rol === rolAdmin &&
        <Link to={"/dashboard"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "whitesmoke" }} />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} sx={{ color: "whitesmoke" }} />
            </ListItemButton>
          </ListItem>
        </Link>

}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText
              primary={"Cerrar sesion"}
              sx={{ color: "whitesmoke" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
 
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <AppBar
          position="fixed"
          sx={{
            width: "100%",
            height: '100px',
          }}
        >
         
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to="/" style={{ color: "whitesmoke" }}>
                <div>
                  <img
                    // eslint-disable-next-line no-undef
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <IconButton
                color="secondary.primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon color="secondary.primary" />
              </IconButton>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:'10px' }}>

              <div id='count' style={countStyles}>
              {cart.length}
           
              </div>
              <div id='cart'>
              <Link to={`/cart`} style={{ textDecoration: 'none', color: 'inherit' }}>

              <IconButton
                color="secondary.primary"
                aria-label="carrito"
              >
                <ShoppingCartIcon  style={cartIconStyles}/>
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
          anchor={"right"}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1976d2",
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
          width: "100%",
          minHeight: "100vh",
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