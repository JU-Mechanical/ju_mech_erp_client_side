//? importing library components
import React, { useState } from "react";
import {
    Box,
    Typography,
} from "@mui/material";

//? Componenets of the regular user profile page 
import Navbar from "../components/Navbar";
import AdminsPanel from "../components/adminDetails/AdminsPanel";
import AdminDetails from "../components/adminDetails/AdminDetails";

//? Static details of the component page
export default function AdminPortal() {

    const [activeComponent, setActiveComponent] = useState("AdminDetails");

    const admin = {
        fullName: "Abhirup Guha Roy",
        role: "Admin",
        email: "admin@example.com",
        phone: "+91 9876543210",
        avatar: "/default-avatar.png", // Replace with actual avatar URL
        department: "Mechanical Engineering",
        lobby: "Design",
        lastLogin: "2025-04-14 10:30 AM",
        description:
          "The admin is responsible for managing the student profiles, handling pending requests, and configuring system settings. They play a crucial role in ensuring the smooth functioning of the portal and maintaining data integrity.",
      };

    const renderActiveComponent = () => {
        switch (activeComponent) {
          case "AdminDetails":
            return <AdminDetails admin={admin} />;
          case "ManageProfiles":
            return <Typography variant="h5">Manage Student Profiles Component</Typography>;
          case "PendingRequests":
            return <Typography variant="h5">Pending Requests Component</Typography>;
          case "Settings":
            return <Typography variant="h5">Settings Component</Typography>;
          case "EditProfile":
            return <Typography variant="h5">Edit Admin Profile Component</Typography>;
          default:
            return <Typography variant="h5">Welcome to the Admin Portal</Typography>;
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
                overflow: "hidden", // Prevent horizontal scrolling
            }}
        >
            <Navbar />
            <Box sx={{ display: "flex", height: "calc(100vh - 64px)", mt: "64px" }}>
                {/* Left Column: Fixed Side Profile */}
                <Box
                    sx={{
                        position: "fixed",
                        top: "64px", // Adjust for the height of the Navbar
                        left: 0,
                        width: "25%", // Adjust width as needed
                        height: "calc(100vh - 64px)",
                        backgroundColor: "rgba(183, 9, 36, 1)",
                        borderRight: "1px solid #ddd",
                        color: "#fff",
                        overflowY: "auto", // Allow scrolling if content overflows
                    }}
                >
                    {/* Primary user details of the user */}
                    <AdminsPanel admin={admin} setActiveComponent={setActiveComponent} />
                    {/* Edit profile option for the user */}
                </Box>

                {/* Right Column: Scrollable Main Content */}
                <Box
                    sx={{
                        marginLeft: "25%", // Matches the width of the left column
                        width: "75%", // Remaining width
                        padding: "20px",
                        overflowY: "auto", // Enable vertical scrolling
                        height: "calc(100vh - 64px)",
                    }}
                >
                    {renderActiveComponent()}

                </Box>
            </Box>
        </Box>
    );
}