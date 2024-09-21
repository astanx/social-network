import React, { useCallback } from "react";
import classes from "./MyHeader.module.css";
import company_logo from "./../UI/Images/company_logo.png";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/storeRedux";
import { LoginActionsTypes, logout } from "../../redux/loginReducer.ts";
import { ThunkDispatch } from "redux-thunk";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

const pages = ["profile", "messages", "find User", "chat"];

const UserMenu: React.FC<{ onClose: () => void; anchorEl: null | HTMLElement }> = React.memo(({ onClose, anchorEl }) => {
  const dispatch: ThunkDispatch<AppStateType, void, LoginActionsTypes> = useDispatch();
  const navigate = useNavigate();

  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={() => { navigate("/profile"); onClose(); }}>
        <Typography sx={{ textAlign: "center" }}>My Profile</Typography>
      </MenuItem>
      <MenuItem onClick={() => { dispatch(logout()); onClose(); }}>
        <Typography sx={{ textAlign: "center" }}>Logout</Typography>
      </MenuItem>
    </Menu>
  );
});

const MyHeader: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const isLogined = useSelector((s: AppStateType) => s.login.email);
  const dispatch: ThunkDispatch<AppStateType, void, LoginActionsTypes> = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((s: AppStateType) => s.login.login);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigation = (page: string) => {
    navigate(`/${page.replace(/\s/g, "")}`);
    handleCloseNavMenu();
  };
  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img className={classes.logo} src={company_logo} alt="logo" />
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
            LOGO
          </Typography>

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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigation(page)}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  whiteSpace: "nowrap",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLogined ? (
              <>
                <Typography
                  aria-controls={anchorElUser ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorElUser ? "true" : undefined}
                  onClick={handleOpenUserMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    whiteSpace: "nowrap",
                  }}
                >
                  {login}
                </Typography>
                <UserMenu onClose={handleCloseUserMenu} anchorEl={anchorElUser} />
              </>
            ) : (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Button
                  onClick={() => {
                    navigate("/login");
                    handleCloseUserMenu();
                  }}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    whiteSpace: "nowrap",
                  }}
                >
                  Login
                </Button>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MyHeader;