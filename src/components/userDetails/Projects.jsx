//? importing necessary libraries and components
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

function Projects({ projectData }) {

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" component="h4" gutterBottom>
        Projects
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Mode</b></TableCell>
              <TableCell><b>Duration</b></TableCell>
              <TableCell><b>Grading</b></TableCell>
              <TableCell><b>Supervisor</b></TableCell>
              <TableCell><b>Co-Supervisor</b></TableCell>
              <TableCell><b>SDG</b></TableCell>
              <TableCell><b>Certificate</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectData.map((project, index) => (
              <TableRow key={index} sx={{
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}>
                <TableCell>{project.type}</TableCell>
                <TableCell>{project.mode}</TableCell>
                <TableCell>{project.duration}</TableCell>
                <TableCell>{project.grading}</TableCell>
                <TableCell>{project.supervisor}</TableCell>
                <TableCell>{project.coSupervisor}</TableCell>
                <TableCell>{project.sdg}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    onClick={() => alert(`Viewing certificate for project ${index + 1}`)}
                  >
                    {project.certificate}
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

export default Projects;