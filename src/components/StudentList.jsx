import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StudentProfile from './StudentProfile';

const UserList = ({ users }) => {
  const [selectedstudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const onClose = () => {
    setSelectedStudent(null);
  };

  const filteredUsers = users.filter(user =>
    `${user.name} ${user.rollNumber}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {!selectedstudent ? (
        <Paper  sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
          <Typography variant="h5" gutterBottom>
            Student List
          </Typography>

          <Box mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by name or roll number"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <List>
            {filteredUsers.map((user, index) => (
              <ListItem
                key={index}
                divider
                onClick={() => setSelectedStudent(user)}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemText
                  primary={user.name}
                  secondary={`Roll No: ${user.rollNumber}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <StudentProfile user={selectedstudent} onClose={onClose} />
      )}
    </>
  );
};

export default UserList;
