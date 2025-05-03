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

function Seminar({ seminars }) {
  return (
    <Box sx={{ mb: 2}}>
      <Typography variant="h4" component="h4" gutterBottom>
        Seminars
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Venue</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell><b>Organizer</b></TableCell>
              <TableCell><b>Certificate</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seminars.map((seminar, index) => (
              <TableRow key={index} sx={{
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}>
                <TableCell>{seminar.name}</TableCell>
                <TableCell>{seminar.venue}</TableCell>
                <TableCell>{seminar.date}</TableCell>
                <TableCell>{seminar.role}</TableCell>
                <TableCell>{seminar.organizer}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => alert(`Viewing certificate for ${seminar.name}`)}
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

export default Seminar;