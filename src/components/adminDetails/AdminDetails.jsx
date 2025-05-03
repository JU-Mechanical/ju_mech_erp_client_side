import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";

export default function AdminDetails({ admin }) {
  return (
    <Box
      sx={{
        padding: "20px",
        mb: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Details
      </Typography>
      {/* Combined Admin Details and Description Section */}
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Admin Details Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" gutterBottom>
              <b>Full Name:</b> {admin.fullName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Role:</b> {admin.role}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Email:</b> {admin.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Phone:</b> {admin.phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Department:</b> {admin.department}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Lobby:</b> {admin.lobby}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Last Login:</b> {admin.lastLogin}
            </Typography>
          </Box>

          {/* Vertical Divider */}
          <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />

          {/* Admin Description Section */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" gutterBottom>
              {admin.description}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}