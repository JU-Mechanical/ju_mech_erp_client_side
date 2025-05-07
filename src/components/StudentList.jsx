import React, { useState } from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import StudentProfile from './StudentProfile';

const UserList = ({ users }) => {
    const [selectedstudent , setSelectedStudent] = useState(null);
    const onClose = () => {
        console.log('helo')
        setSelectedStudent(null);
    }
  return (
    <>
    {!selectedstudent?(<Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Student List
      </Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={index} divider onClick={()=>{setSelectedStudent(user); }} sx={{ cursor: 'pointer' }}>
            <ListItemText
              primary={user.name}
              secondary={`Roll No: ${user.rollNumber}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>):(
        <StudentProfile user={selectedstudent} onClose={onClose} />
    )}
    </>
  );
};

export default UserList;
