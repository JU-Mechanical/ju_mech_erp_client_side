import React from "react";
import { Box, Typography, Chip, Grid, ButtonBase } from "@mui/material";

function Leadership({ roles }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" component="h4" gutterBottom>
        Leadership Roles
      </Typography>
      <Grid container spacing={2}>
        {roles.map((role, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ButtonBase
              onClick={() => alert(`Viewing certificate for ${role.role}`)}
              sx={{
                width: "100%",
                textAlign: "center",
                display: "block", // Ensures the button takes up the full width
              }}
            >
              <Box
                sx={{
                  padding: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  width: "100%",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Chip
                  label={role.role}
                  color="primary"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    backgroundColor: "#b70924",
                    color: "#fff",
                    borderRadius: "50px", // Makes the badge round
                    padding: "0 12px", // Adds horizontal padding for better appearance
                  }}
                />
                <Typography variant="body1" color="text.primary" gutterBottom>
                  {role.details}
                </Typography>
              </Box>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Leadership;
