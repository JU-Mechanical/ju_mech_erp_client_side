import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function HigherStudy({ higherStudy }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" component="h4" gutterBottom>
        Higher Studies
      </Typography>
      <Card
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          position: "relative", // To position the icon
        }}
      >
        {/* Verified Icon */}
        <CheckCircleIcon
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#4caf50", // Green color for verified
            fontSize: 28,
          }}
        />
        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom>
            {higherStudy.programme}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Tenure/Duration:</b> {higherStudy.tenure}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Institute/University:</b> {higherStudy.institute}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Country:</b> {higherStudy.country}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default HigherStudy;