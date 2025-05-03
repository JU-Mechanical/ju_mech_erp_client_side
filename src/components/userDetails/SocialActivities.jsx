import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemButton, ListItemText, Divider, Button, Chip } from "@mui/material";

function SocialActivities({ activities }) {
  const [selectedActivity, setSelectedActivity] = useState(activities[0]); // Default to the first activity

  return (
    <Box sx={{ mb: 2 }}>
      {/* Heading */}
      <Typography variant="h4" component="h4" gutterBottom>
        Social Events
      </Typography>

      {/* Main Content */}
      <Box sx={{ display: "flex", height: "100%", gap: 2 }}>
        {/* Left Column: List of Social Events */}
        <Box
          sx={{
            width: "30%",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            backgroundColor: "#f9f9f9",
          }}
        >
          <List>
            {activities.map((activity, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  selected={selectedActivity.name === activity.name}
                  onClick={() => setSelectedActivity(activity)}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#b70924",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#a10820",
                      },
                    },
                  }}
                >
                  <ListItemText primary={activity.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Column: Details of the Selected Event */}
        <Box sx={{ flexGrow: 1, padding: 2, position: "relative" }}>
          <Typography variant="h5" component="h3" gutterBottom>
            {selectedActivity.name}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" gutterBottom>
            <b>Venue:</b> {selectedActivity.venue}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Date:</b> {selectedActivity.date}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Organizer:</b> {selectedActivity.organizer}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Role:</b> {selectedActivity.role}
          </Typography>

          {/* Certified Tag and View Certificate Button */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Chip
              label="Certified"
              color="success"
              sx={{
                fontWeight: "bold",
                backgroundColor: "#4caf50",
                color: "#fff",
              }}
            />
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => alert(`Viewing certificate for ${selectedActivity.name}`)}
            >
              View Certificate
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SocialActivities;