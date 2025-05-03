//? importing library components in the grade component
import React from 'react'
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
} from "@mui/material";


//^ Showing the data in table format for grade component
function UserDetailsRightGrade({ sgpaData }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" component="h4" gutterBottom>
        Semester-wise SGPA
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Semester</b></TableCell>
              <TableCell><b>SGPA</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sgpaData.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell>{row.semester}</TableCell>
                <TableCell>{row.sgpa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UserDetailsRightGrade