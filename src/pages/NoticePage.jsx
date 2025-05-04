import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Grid,
} from '@mui/material';
import Navbar from '../components/Navbar';

const NoticePage = () => {
  const [notices, setNotices] = useState([]);

  // Mock data for notices - Replace with actual API call
  useEffect(() => {
    // TODO: Replace with actual API call
    const mockNotices = [
      {
        id: 1,
        title: 'Semester Registration Notice',
        content: 'All students are required to complete their semester registration by the end of this week.',
        date: '2024-04-28',
        priority: 'high',
      },
      {
        id: 2,
        title: 'Holiday Announcement',
        content: 'The university will remain closed on May 1st for Labor Day.',
        date: '2024-04-27',
        priority: 'medium',
      },
    ];
    setNotices(mockNotices);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ff4444';
      case 'medium':
        return '#ffbb33';
      case 'low':
        return '#00C851';
      default:
        return '#33b5e5';
    }
  };

  return (
    <Box>
      <Navbar />
      {/* Maroon Header Strip */}
      <Box 
        sx={{ 
          width: '100%', 
          bgcolor: '#b70924', 
          py: 2,
          mt: 8,
          boxShadow: 3
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 500 }}>
            Notices
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {notices.map((notice) => (
            <Grid item xs={12} key={notice.id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    backgroundColor: getPriorityColor(notice.priority),
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {notice.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {new Date(notice.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    {notice.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default NoticePage;
