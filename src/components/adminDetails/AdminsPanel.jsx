import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Edit icon
import GroupIcon from "@mui/icons-material/Group"; // Manage Users icon
import AssessmentIcon from "@mui/icons-material/Assessment"; // Reports icon
import SettingsIcon from "@mui/icons-material/Settings"; // Settings icon

export default function AdminsPanel({ admin, setActiveComponent }) {
  // Define admin options as an array of objects
  const adminOptions = [
    {
      label: "Check Admin Details",
      icon: <GroupIcon />,
      onClick: () => setActiveComponent("AdminDetails"), // Activate AdminDetails component
    },
    {
      label: "Manage Student Profiles",
      icon: <GroupIcon />,
      onClick: () => setActiveComponent("ManageProfiles"), // Activate ManageProfiles component
    },
    {
      label: "Pending Requests",
      icon: <AssessmentIcon />,
      onClick: () => setActiveComponent("PendingRequests"), // Activate PendingRequests component
    },
    {
      label: "Configure Settings",
      icon: <SettingsIcon />,
      onClick: () => setActiveComponent("Settings"), // Activate Settings component
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        paddingTop: "40px",
        paddingBottom: "40px",
        color: "#fff",
        textAlign: "center",
        display: "flex", // Flexbox for vertical alignment
        flexDirection: "column", // Stack items vertically
        height: "100%", // Full height to push the button to the bottom
        backgroundColor: "#b70924", // Background color for admin panel
      }}
    >
      {/* Admin Avatar */}
      <Avatar
        src={admin.avatar}
        alt={admin.fullName}
        sx={{
          width: 120,
          height: 120,
          margin: "0 auto 20px",
          border: "5px solid #fff", // Border for the avatar
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional shadow
        }}
      />

      {/* Admin Details */}
      <Typography variant="h5" component="h2" gutterBottom>
        {admin.fullName}
      </Typography>

      {/* Admin Options */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          marginBottom: "20px",
          width: "100%", // Full width for buttons
        }}
      >
        {adminOptions.map((option, index) => (
          <Button
            key={index}
            variant="contained"
            startIcon={option.icon}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              paddingTop: "20px",
              paddingBottom: "20px",
              transition: "background-color 0.1s ease-in-out",
              width: "100%",
              borderRadius: "50px",
              "&:hover": {
                bgcolor: "#2c3e50",
              },
              "&:focus": {
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                bgcolor: "#2c3e50",
              },
            }}
            onClick={option.onClick}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Edit Admin Details Button */}
      <Button
        variant="outlined"
        color="white"
        startIcon={<EditIcon />} // Add the Edit icon here
        sx={{
          width: "80%",
          alignSelf: "center",
          marginTop: "auto", // Push the button to the bottom
          "&:hover": {
            backgroundColor: "#36454F", // Darker shade on hover
          },
        }}
        onClick={() => setActiveComponent("EditProfile")} // Activate EditProfile component
      >
        Edit Admin Profile
      </Button>
    </Box>
  );
}