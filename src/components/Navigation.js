import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Routes from "../constants/routes";
import { useAuth } from "@/lib/auth";
import Link from "next/Link";

const menuItems = [
  {
    title: "Inicio",
    to: Routes.HOME,
  },
  {
    title: "Adopciones",
    to: Routes.ADOPTIONS,
  },
  {
    title: "Perros",
    to: Routes.DOGS,
  },
  {
    title: "Gatos",
    to: Routes.CATS,
  },
  {
    title: "Otros",
    to: Routes.OTHER,
  },
  {
    title: "¿Cómo adoptar?",
    to: Routes.INSTRUCTIONS,
  },
  {
    title: "Dar en adopción",
    to: Routes.GIVE_PET,
  },
];

export default function ResponsiveAppBar(props) {
  const { user, logout, login } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    handleCloseNavMenu();
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    try {
      await logout();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={Routes.HOME} passHref>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              POLI HUELLAS
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {menuItems.map((item) => (
                <Link href={item.to} key={item.title}>
                  <MenuItem key={item.title} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{item.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            POLI HUELLAS
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, mx: 14 }}
          >
            {menuItems.map((item) => (
              <Link href={item.to} key={item.title}>
                <Button
                  key={item.title}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item.title}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {user ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="avatar-user" src="{user.avatar}" />
                </IconButton>
              ) : (
                <Link href={Routes.LOGIN}>
                  <Button variant="contained">Iniciar sesión</Button>
                </Link>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
            >
              <Link href={Routes.USERPROFILE}>
                <MenuItem onClick={handleCloseUserMenu}>Perfil</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
