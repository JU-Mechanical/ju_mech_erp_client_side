import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function TechFests({ techFests }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" component="h4" gutterBottom>
        Tech Fests
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Organiser</b></TableCell>
              <TableCell><b>Event Type</b></TableCell>
              <TableCell><b>Year</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell><b>Teammates</b></TableCell>
              <TableCell><b>Outcome</b></TableCell>
              <TableCell><b>Certificate</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {techFests.map((fest, index) => (
              <TableRow key={index} sx={{
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}>
                <TableCell>{fest.name}</TableCell>
                <TableCell>{fest.organiser}</TableCell>
                <TableCell>{fest.eventType}</TableCell>
                <TableCell>{fest.year}</TableCell>
                <TableCell>{fest.role}</TableCell>
                <TableCell>{fest.teammates.join(", ")}</TableCell>
                <TableCell>{fest.outcome}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => alert(`Viewing certificate for ${fest.name}`)}
                  >
                    View Certificate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TechFests;