"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../state";

export default function Navbar() {
  const dispatch = useDispatch();
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  const user = token
    ? JSON.parse(atob(token.split("=")[1].split(".")[1]))
    : null;

  //? function to handle logout
  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0; secure; SameSite=Strict";
    dispatch(setLogout());
    localStorage.clear();
    navigate("/");
    return;
  };

  const handleInProgress = () => {
    alert(
      "This feature is currently under development. Please check back later."
    );
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#8e0038", // Updated to a more stylish shade
        padding: { xs: "0 15px", md: "0 30px" }, // Increased padding for better spacing
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Added shadow for depth
        transition: "background-color 0.3s ease", // Smooth transition for hover effects
        "&:hover": {
          bgcolor: "#a00042", // Slightly lighter shade on hover
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: "50px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {/* Left: Logo or Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1rem", md: "1.5rem" },
            flex: { xs: "1 1 100%", md: "0 0 auto" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          JUMERP
        </Typography>

        {/* Center: Navigation Links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: { xs: 1, md: 2 },
            flex: { xs: "1 1 100%", md: "0 0 auto" },
            justifyContent: { xs: "center", md: "flex-start" },
            mt: { xs: 1, md: 0 },
          }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontSize: { xs: "0.9rem", md: "1.1rem" }, // Slightly larger font size
              fontWeight: "bold", // Bold text for better readability
              "&:hover": {
                textDecoration: "underline",
                color: "#ffcccb", // Stylish hover color
              },
              transition: "color 0.3s ease", // Smooth color transition
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/notices"
            sx={{
              fontSize: { xs: "0.9rem", md: "1.1rem" }, // Slightly larger font size
              fontWeight: "bold", // Bold text for better readability
              "&:hover": {
                textDecoration: "underline",
                color: "#ffcccb", // Stylish hover color
              },
              transition: "color 0.3s ease", // Smooth color transition
            }}
          >
            Notices
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/faculty"
            sx={{
              fontSize: { xs: "0.9rem", md: "1.1rem" }, // Slightly larger font size
              fontWeight: "bold", // Bold text for better readability
              "&:hover": {
                textDecoration: "underline",
                color: "#ffcccb", // Stylish hover color
              },
              transition: "color 0.3s ease", // Smooth color transition
            }}
          >
            Faculty
          </Button>
          <Button
            color="inherit"
            onClick={handleInProgress}
            sx={{
              fontSize: { xs: "0.9rem", md: "1.1rem" }, // Slightly larger font size
              fontWeight: "bold", // Bold text for better readability
              "&:hover": {
                textDecoration: "underline",
                color: "#ffcccb", // Stylish hover color
              },
              transition: "color 0.3s ease", // Smooth color transition
            }}
          >
            Events
          </Button>
          <Button
            color="inherit"
            onClick={handleInProgress}
            sx={{
              fontSize: { xs: "0.9rem", md: "1.1rem" }, // Slightly larger font size
              fontWeight: "bold", // Bold text for better readability
              "&:hover": {
                textDecoration: "underline",
                color: "#ffcccb", // Stylish hover color
              },
              transition: "color 0.3s ease", // Smooth color transition
            }}
          >
            Routines
          </Button>
        </Box>

        {/* Hamburger Menu for Small Screens */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button component={Link} to="/">
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/notices">
                <ListItemText primary="Notices" />
              </ListItem>
              <ListItem button component={Link} to="/faculty">
                <ListItemText primary="Faculty" />
              </ListItem>
              <ListItem button onClick={handleInProgress}>
                <ListItemText primary="Events" />
              </ListItem>
              <ListItem button onClick={handleInProgress}>
                <ListItemText primary="Routines" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Right: User Full Name and Avatar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 2 },
            mt: { xs: 1, md: 0 },
          }}
        >
          <Avatar
            src={user?.avatar || "/default-avatar.png"}
            alt={user?.name}
            sx={{
              width: { xs: 35, md: 45 }, // Slightly larger avatar
              height: { xs: 35, md: 45 },
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effects
              "&:hover": {
                transform: "scale(1.1)", // Slight zoom on hover
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)", // Enhanced shadow
              },
            }}
            onClick={handleMenuOpen}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            disableAutoFocusItem
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "10px", // Rounded corners for the menu
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Stylish shadow
                padding: "10px", // Added padding for better spacing
              },
            }}
          >
            {user
              ? [
                  <MenuItem
                    key="user - name"
                    component={Link}
                    to={`/profile/${user.name}`}
                    onClick={handleMenuClose}
                    sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                  >
                    {user.name}
                  </MenuItem>,
                  <MenuItem
                    key="logout"
                    component={Link}
                    onClick={handleLogout}
                    sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                  >
                    Logout
                  </MenuItem>,
                ]
              : [
                  <MenuItem
                    key="user-login"
                    component={Link}
                    to="/auth"
                    onClick={handleMenuClose}
                    sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                  >
                    Login
                  </MenuItem>,
                  <MenuItem
                    key="administer-login"
                    component={Link}
                    to="/admin-login"
                    onClick={handleMenuClose}
                    sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                  >
                    Administrative Login
                  </MenuItem>,
                ]}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
