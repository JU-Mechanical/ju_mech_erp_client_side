import React from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";

function StartUp({ startupDetails }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" component="h4" gutterBottom>
        Startups & Entrepreneurship
      </Typography>

      {/* Section 1: Associated with Startups */}
      <Card
        sx={{
          mb: 3,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom>
            Associated with/Developed Startups/Entrepreneurship Initiatives
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" gutterBottom>
            <b>Details:</b> {startupDetails.pastInitiatives || "No details provided."}
          </Typography>
        </CardContent>
      </Card>

      {/* Section 2: Interested in Future Startups */}
      <Card
        sx={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom>
            Interested in Forming Startups/Entrepreneurship Initiatives in the Future
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" gutterBottom>
            <b>Details:</b> {startupDetails.futureInterest || "No details provided."}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Support from University:</b> {startupDetails.universitySupport ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>External Support:</b> {startupDetails.externalSupport ? "Yes" : "No"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default StartUp;