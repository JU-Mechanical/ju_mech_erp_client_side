import React from "react";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";

const Sidebar = ({ activeSection, setActiveSection, profileAvatar }) => {
  // sections for user application form
  const sections = [
    "General Info",
    "Enrollment Details",
    "Academic Background",
    "Academic Info",
    "Placement",
    "Co-Curricular and Extra-Curricular Activities",
    "Miscellaneousneous",
  ];

  return (
    <Box
      //box animation properties using framer motion
      component={motion.div}
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      //styling the box
      sx={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#b70924",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", // Adjust to start for avatar
        padding: "20px",
      }}
    >
      {/* Profile Avatar */}
      {profileAvatar && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
            mt: 2, // Add margin for better spacing in mobile view
          }}
        >
          {profileAvatar}
        </Box>
      )}
      {/* mapping the buttons */}
      {sections.map((text, index) => (
        <Button
          key={index}
          fullWidth
          onClick={() => setActiveSection(index)} //event handler to change the active session
          sx={{
            my: 1,
            backgroundColor: activeSection === index ? "#fff" : "transparent",
            color: activeSection === index ? "#b70924" : "#fff",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#fff", color: "#b70924" },
          }}
        >
          {text}
        </Button>
      ))}
      <Box
        sx={{
          mt: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: "20px",
        }}
      >
        {/* Back Button
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => window.history.back()} // Navigate back
          sx={{
            backgroundColor: "#fff",
            color: "#b70924",
            "&:hover": { backgroundColor: "#f0f0f0", color: "#b70924" },
          }}
        >
          Back
        </Button> */}

        {/* Logout Button */}
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => {
            document.cookie = "token=; path=/; max-age=0"; // Clear token
            window.location.href = "/"; // Redirect to login page
          }}
          sx={{
            backgroundColor: "#fff",
            color: "#b70924",
            "&:hover": { backgroundColor: "#f0f0f0", color: "#b70924" },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
