import React from "react";
import { Box, Typography, Avatar, Button, useMediaQuery } from "@mui/material"; // Added useMediaQuery
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function UserDetailsLeft({ user }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)"); // Check for mobile screens

  const handleEditClick = () => {
    navigate(`/updateform/${user.name}`);
  };

  return (
    <Box
      sx={{
        padding: isMobile ? "10px" : "20px", // Adjust padding for mobile
        color: "#fff",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Avatar
        src={user.avatar}
        alt={user.name}
        sx={{
          width: isMobile ? 80 : 120, // Adjust size for mobile
          height: isMobile ? 80 : 120,
          margin: "0 auto 20px",
          border: "10px solid #36454F",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      />
      <Typography
        variant={isMobile ? "h6" : "h5"} // Adjust font size for mobile
        component="h2"
        gutterBottom
      >
        {user.name}
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        <b>Roll:</b> {user.rollNumber}
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        <b>Phone:</b> {user.mobileNo}
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        <b>Email:</b> {user.email}
      </Typography>

      <Button
        variant="outlined"
        color="white"
        startIcon={<EditIcon />}
        sx={{
          marginTop: "auto",
          fontSize: isMobile ? "0.8rem" : "1rem", // Adjust font size for mobile
          "&:hover": {
            backgroundColor: "#36454F",
          },
        }}
        onClick={() => handleEditClick()}
      >
        Edit Dashboard
      </Button>
    </Box>
  );
}
