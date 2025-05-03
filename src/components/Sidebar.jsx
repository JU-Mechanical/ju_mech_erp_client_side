import React from "react";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";

const Sidebar = ({ activeSection, setActiveSection }) => {
  // sections for user application form
  const sections = [
    "General Info",
    "Enrollment Details",
    "Academic Background",
    "Academic Info",
    "Placement",
    "Co-Curricular and Extra-Curricular Activities",
    "Miscallaneous",
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
        justifyContent: "center",
        padding: "20px",
      }}
    >
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
    </Box>
  );
};

export default Sidebar;
