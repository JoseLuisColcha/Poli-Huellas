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
  Skeleton,
  Tabs,
  Tab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Routes from "../constants/routes";
import { SESSION_STATE, useAuth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/router";

const menuItems = [
  {
    title: "Pubicaciones",
    to: "#",
    subItems: [
      {
        title: "Gatos",
        to: "#",
      },
      {
        title: "Perros",
        to: "#",
      },
      {
        title: "Otros",
        to: "#",
      },
    ],
  },
  {
    title: "Usuarios",
    to: "/admin/usuarios",
  },
];

const INITIAL_TAB_MENU_STATE = {
  anchorEl: null,
  item: null,
}

export function AdminNav() {
  const { currentUser, logout, session } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [tabMenuState, setTabMenuState] = React.useState(INITIAL_TAB_MENU_STATE);

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
    await logout();
  };

  const router = useRouter();

  const handleTabClick = (e, item) => {
    if (!item.subItems) router.push(item.to);
    setTabMenuState({ anchorEl: e.currentTarget, item });
  };

  const handleCloseTabMenu = () => {
    setTabMenuState(INITIAL_TAB_MENU_STATE);
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
              autoFocus
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
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: "1rem", md: "2rem" },
            }}
          >
            POLI HUELLAS
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
              mx: 3,
            }}
          >
            <Tabs
              value={router.pathname}
              textColor="secondary"
              indicatorColor="secondary"
            >
              {menuItems.map((item, index) => (
                <Tab
                  onClick={(e) => handleTabClick(e, item)}
                  key={item.to}
                  value={item.to}
                  label={item.title}
                  sx={{ my: 1, color: "white", display: "block" }}
                  tabIndex={index}
                />
              ))}
            </Tabs>
            <Menu
              id="tab-item-menu"
              anchorEl={tabMenuState.anchorEl}
              open={!!tabMenuState.anchorEl && !!tabMenuState.item.subItems}
              onClose={handleCloseTabMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {tabMenuState?.item?.subItems?.map((subItem) => (
                <MenuItem
                  key={subItem.title}
                  onClick={handleCloseTabMenu}
                >
                  {subItem.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {session ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="avatar-user" src={`${currentUser?.photoURL}`} />
                </IconButton>
              ) : session === SESSION_STATE.NO_LOGGED ? (
                <Link href={Routes.LOGIN}>
                  <Button variant="contained" sx={{ m: "0.3rem" }}>
                    Iniciar sesi??n
                  </Button>
                </Link>
              ) : (
                <Skeleton variant="circular" width={40} height={40} />
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
              onClose={handleCloseUserMenu}
            >
              <Link href={Routes.ADMIN_USERS}>
                <MenuItem onClick={handleCloseUserMenu}>Perfil</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Cerrar sesi??n</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
