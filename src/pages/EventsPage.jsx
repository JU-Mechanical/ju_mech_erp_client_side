import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  LocationOn,
  Person,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const events = [
    // add events here
  ];

  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'seminar', label: 'Seminars' },
    { value: 'competition', label: 'Competitions' },
  ];

  const filteredEvents = events.filter(event => 
    activeFilter === 'all' || event.type === activeFilter
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#faf9fa' }}>
      <Navbar />
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#b70924',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            Events & Activities
          </Typography>
          <Typography variant="h6">
            Stay updated with seminars, workshops, competitions and more
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Filters */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                variant="outlined"
                label="Filter by Event Type"
              >
                {eventTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>

        {/* Events Grid */}
        <Grid container spacing={4}>
          {filteredEvents.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" align="center" color="text.secondary">
                No events to display.
              </Typography>
            </Grid>
          ) : (
            filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #eee',
                    boxShadow: 2,
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.image}
                    alt={event.title}
                    sx={{ objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                    <Box>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {event.description}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <CalendarToday sx={{ mr: 1, color: '#b70924' }} />
                        {event.date}
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <AccessTime sx={{ mr: 1, color: '#b70924' }} />
                        {event.time}
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <LocationOn sx={{ mr: 1, color: '#b70924' }} />
                        {event.location}
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person sx={{ mr: 1, color: '#b70924' }} />
                        {event.speaker}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        bgcolor: '#b70924',
                        '&:hover': {
                          bgcolor: '#8e0038',
                        },
                      }}
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default EventsPage; 