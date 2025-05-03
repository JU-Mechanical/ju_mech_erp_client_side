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

function Skills({ skills }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" component="h4" gutterBottom>
        Skills
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Offered By</b></TableCell>
              <TableCell><b>Mode</b></TableCell>
              <TableCell><b>Duration</b></TableCell>
              <TableCell><b>Fee(in INR)</b></TableCell>
              <TableCell><b>Certificate</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill, index) => (
              <TableRow key={index} sx={{
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.offeredBy}</TableCell>
                <TableCell>{skill.mode}</TableCell>
                <TableCell>{skill.duration}</TableCell>
                <TableCell>{skill.fee}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => alert(`Viewing certificate for ${skill.name}`)}
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

export default Skills;