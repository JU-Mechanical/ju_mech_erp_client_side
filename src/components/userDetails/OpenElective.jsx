//? importing necessary libraries and components
import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";


//^ Showing the open electives taken by the user as grid-card components
export default function OpenElective({ electives }) {
  return (
    <Box sx={{mb:2}}>
      <Typography variant="h4" component="h4" gutterBottom>
        Open Electives
      </Typography>
      <Grid container spacing={2}>
        {electives.map((elective, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "#f5f5f5",
              },
            }}>
              <CardContent>
                <Typography variant="body1" component="p">
                  {elective}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}