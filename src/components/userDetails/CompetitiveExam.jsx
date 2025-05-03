///? importing necessary libraries and components
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

//^ Shows the competitive exams taken by the user in the form of table
function CompetitiveExam({ exams }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" component="h4" gutterBottom>
        Competitive Exams
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Examination Name</b></TableCell>
              <TableCell><b>Year</b></TableCell>
              <TableCell><b>Specific Training</b></TableCell>
              <TableCell><b>Training Name</b></TableCell>
              <TableCell><b>Training Type</b></TableCell>
              <TableCell><b>Training Mode</b></TableCell>
              <TableCell><b>Rank Card/Result</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam, index) => (
              <TableRow key={index} sx={{
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}>
                <TableCell>{exam.name}</TableCell>
                <TableCell>{exam.year}</TableCell>
                <TableCell>{exam.specificTraining ? "Yes" : "No"}</TableCell>
                <TableCell>{exam.trainingName || "N/A"}</TableCell>
                <TableCell>{exam.trainingType || "N/A"}</TableCell>
                <TableCell>{exam.trainingMode || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => alert(`Viewing rank card/result for ${exam.name}`)}
                  >
                    View Rank Card
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

export default CompetitiveExam;