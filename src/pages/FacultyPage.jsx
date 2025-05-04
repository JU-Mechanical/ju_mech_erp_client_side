import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from '@mui/material';

const FacultyPage = () => {
  const [faculty, setFaculty] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockFaculty = [
      {
        id: 1,
        name: 'Prof Swarnendu Sen',
        title: 'Professor',
        image: '/path/to/image1.jpg', // Replace with actual image path
      },
      {
        id: 2,
        name: 'Prof Achintya Mukhopadhyay',
        title: 'Professor',
        image: '/path/to/image2.jpg', // Replace with actual image path
      },
      {
        id: 3,
        name: 'Dr. Suswagata Poria',
        title: 'Assistant Professor',
        image: '/path/to/image3.jpg', // Replace with actual image path
      }
    ];
    setFaculty(mockFaculty);
  }, []);

  const designations = [
    { value: '', label: 'All Designations' },
    { value: 'Professor', label: 'Professor' },
    { value: 'Associate Professor', label: 'Associate Professor' },
    { value: 'Assistant Professor', label: 'Assistant Professor' },
  ];

  const filteredFaculty = faculty.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDesignation = selectedDesignation === '' || member.title === selectedDesignation;
    return matchesSearch && matchesDesignation;
  });

  return (
    <Box>
      {/* Maroon Header Strip */}
      <Box 
        sx={{ 
          width: '100%', 
          bgcolor: '#b70924', 
          py: 2, 
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1,
          boxShadow: 3
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 500 }}>
            Faculty Directory
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4, mt: 12 }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search by Name/Title"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Search by Designation"
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              variant="outlined"
            >
              {designations.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {filteredFaculty.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
              >
                <Box 
                  sx={{ 
                    position: 'relative',
                    paddingTop: '100%', // 1:1 Aspect ratio
                    bgcolor: '#f5f5f5',
                    overflow: 'hidden'
                  }}
                >
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: 0
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    {member.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.department}
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

export default FacultyPage; 