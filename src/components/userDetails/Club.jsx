import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  ButtonBase,
} from "@mui/material";

function Club({ clubs }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" component="h4" gutterBottom>
        Clubs
      </Typography>
      <Grid container spacing={2}>
        {clubs.map((club, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ButtonBase
              onClick={() => alert(`Viewing certificate for ${club.name}`)}
              sx={{
                height: "100%",
                width: "100%",
                textAlign: "center",
                display: "block", // Ensures the button takes up the full width
                transition: "transform 0.3s ease-in-out", // Smooth scaling effect
                "&:hover": {
                  transform: "scale(1.05)", // Scale up on hover
                },
              }}
            >
              <Card
                sx={{
                  textAlign: "center",
                  padding: "0px",
                  overflow: "visible",
                  cursor: "pointer",
                  height: "100%", // Make the card fill the grid cell
                  display: "flex",
                  flexDirection: "column", // Ensure content stacks vertically
                }}
              >
                {/* Wrapper for Avatar with Background */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "80px",
                    backgroundColor: "#b70924",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    marginBottom: "0px", // Pull the Avatar halfway out
                  }}
                >
                  <Avatar
                    src={club.image}
                    alt={club.name}
                    sx={{
                      width: 100,
                      height: 100,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      border: "2px solid #b70924",
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ color: "#b70924" }}
                    gutterBottom
                  >
                    {club.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {club.role}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Accolades:
                  </Typography>
                  {/* Listing the array of accolades */}
                  {club.accolades.map((accolade, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      color="text.primary"
                    >
                      {accolade}
                    </Typography>
                  ))}

                  <Typography variant="body1" color="text.primary">
                    Achievements:
                  </Typography>
                  {/* Listing the array of achievements */}
                  {club.achievements.map((achievement, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      color="text.primary"
                    >
                      {achievement}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Club;