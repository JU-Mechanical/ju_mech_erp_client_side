"use client";

import { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  Dashboard,
  Help,
  AccountCircle,
  ExitToApp,
  Home,
  CottageRounded,
  ArticleRounded,
  ArrowBackIosNew,
  ChevronLeft,
} from "@mui/icons-material";
import MultiStepForm from "./student_form";
import Navbar from "../components/Navbar";
import Requests from "../components/Requests";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const drawerWidth = 240;

export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // New state for sidebar collapse
  const isMobile = useMediaQuery("(max-width:900px)");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [selectedTab, setselectedTab] = useState("My Details");
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        bgcolor: "#b70924",
        height: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: sidebarCollapsed ? 60 : drawerWidth, // Adjust width based on collapse state
        transition: "width 0.3s ease-in-out",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 5,
            mb: 2,
            px: 2,
          }}
        >
          {!isMobile && !sidebarCollapsed && (
            <ArrowBackIosNew onClick={() => navigate(-1)} />
          )}
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              ml: isMobile ? 3 : 0,
              display: sidebarCollapsed ? "none" : "block", // Hide text when collapsed
            }}
          >
            My Dashboard
          </Typography>
          {!isMobile && (
            <IconButton
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              sx={{ color: "white" }}
            >
              {sidebarCollapsed ? <Menu /> : <ChevronLeft />}
            </IconButton>
          )}
        </Box>

        <List>
          {[
            {
              text: "My Details",
              icon: (
                <CottageRounded
                  sx={{
                    color: selectedTab === "My Details" ? "black" : "white",
                    fontSize: selectedTab === "My Details" ? "2rem" : "1.5rem",
                    transition: "font-size 0.3s ease-in-out",
                  }}
                />
              ),
            },
            {
              text: "My Requests",
              icon: (
                <ArticleRounded
                  sx={{
                    color: selectedTab === "My Requests" ? "black" : "white",
                    fontSize: selectedTab === "My Requests" ? "2rem" : "1.5rem",
                    transition: "font-size 0.3s ease-in-out",
                  }}
                />
              ),
            },
          ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  bgcolor: selectedTab === item.text ? "white" : "transparent",
                  width: "100%",
                  borderTopLeftRadius: selectedTab === item.text ? 16 : 0,
                  borderBottomLeftRadius: selectedTab === item.text ? 16 : 0,
                  position: "relative",
                  overflow: "visible",
                  justifyContent: sidebarCollapsed ? "center" : "flex-start", // Center icon when collapsed
                }}
                onClick={() => setselectedTab(item.text)}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    justifyContent: "center",
                    minWidth: sidebarCollapsed ? 0 : undefined, // Remove extra padding when collapsed
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!sidebarCollapsed && (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      color: selectedTab === item.text ? "black" : "white",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Button Positioned at the Bottom */}
      <ListItem disablePadding sx={{ mb: 2 }}>
        <ListItemButton
          sx={{
            bgcolor: selectedTab === "Logout" ? "white" : "transparent",
            width: "100%",
            borderRadius: 6,
            justifyContent: sidebarCollapsed ? "center" : "flex-start", // Center icon when collapsed
          }}
          onClick={() => {
            setselectedTab("Logout");
            // Add logout logic here
          }}
        >
          <ListItemIcon
            sx={{
              color: "white",
              justifyContent: "center",
              minWidth: sidebarCollapsed ? 0 : undefined, // Remove extra padding when collapsed
            }}
          >
            <ExitToApp />
          </ListItemIcon>
          {!sidebarCollapsed && (
            <ListItemText
              primary="Logout"
              sx={{
                color: selectedTab === "Logout" ? "black" : "white",
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#b70924", p: 1 }}>
      <CssBaseline />
      {/* Top AppBar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{ bgcolor: "transparent", boxShadow: "none" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Burger Menu for Mobile */}
            <IconButton
              edge="start"
              color="white"
              aria-label="menu"
              sx={{ display: { md: "none" }, backgroundColor: "#b70924" }}
              onClick={handleDrawerToggle}
            >
              <Menu sx={{ color: "white", fontSize: "2.5rem" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar for Desktop */}
      <Box
        component="nav"
        sx={{
          width: { md: sidebarCollapsed ? 60 : drawerWidth },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              transition: "all 0.3s ease-in-out",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: sidebarCollapsed ? 60 : drawerWidth,
              position: "relative",
              transition: "all 0.3s ease-in-out",
              backgroundColor: "inherit",
              borderRight: "none", // Ensures no line appears on the right
              boxShadow: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      {selectedTab === "My Details" && <MultiStepForm />}
      {selectedTab === "My Requests" && <Requests />}
    </Box>
  );
}
