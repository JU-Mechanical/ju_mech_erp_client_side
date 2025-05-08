import React from 'react';
import {
  Card, CardContent, Typography, Grid, Box, Divider, Chip
} from '@mui/material';

// Helper component to render labeled data
const Field = ({ label, value }) => (
  <Grid container spacing={1} sx={{ mb: 1 }}>
    <Grid item xs={4}><Typography fontWeight="bold">{label}</Typography></Grid>
    <Grid item xs={8}><Typography>{value ?? '—'}</Typography></Grid>
  </Grid>
);

// Helper to render sections
const Section = ({ title, children }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </CardContent>
  </Card>
);

const StudentProfile = ({ user, onClose }) => {
  if (!user) return <Typography>No user data</Typography>;

  const {
    name, mobileNo, email, rollNumber, personalInfo,
    enrollmentDetails, academicBackground, academicInfo,
    curricularInfo, careerProgression, miscellaneous
  } = user;

  return (
    <Box p={3}>
        <Typography onClick={()=>{onClose();}} sx={{cursor:'pointer'}}>Back</Typography>
      {/* Basic Info */}
      <Section title="Basic Information">
        <Field label="Name" value={name} />
        <Field label="Mobile No" value={mobileNo} />
        <Field label="Email" value={email} />
        <Field label="Roll Number" value={rollNumber} />
      </Section>

      {/* Personal Info */}
      <Section title="Personal Information">
        {Object.entries(personalInfo || {}).map(([key, val]) => (
          <Field key={key} label={key} value={val} />
        ))}
      </Section>

      {/* Enrollment Details */}
      <Section title="Enrollment Details">
        {Object.entries(enrollmentDetails || {}).map(([key, val]) => (
          <Field key={key} label={key} value={val} />
        ))}
      </Section>

      {/* Academic Background */}
      <Section title="Academic Background">
        {Object.entries(academicBackground || {}).map(([key, val]) => (
          <Field key={key} label={key} value={val} />
        ))}
      </Section>

      {/* Academic Info */}
      <Section title="Academic Info">
        {(academicInfo?.grades || []).map((grade, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Semester {grade.semester}</Typography>
            <Field label="SGPA" value={grade.sgpa} />
            <Field label="CGPA" value={grade.cgpa} />
          </Box>
        ))}
        {/* Additional sections like projects, courses, etc., can be mapped similarly */}
      </Section>

      {/* Co-Curricular Info */}
      <Section title="Co-Curricular Activities">
        {['clubs', 'techFests', 'leadership', 'sports', 'skills', 'socialActivities', 'seminars'].map(cat => (
          <Box key={cat} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>{cat}</Typography>
            {(curricularInfo?.[cat] || []).map((item, idx) => (
              <Card variant="outlined" sx={{ my: 1, p: 1 }} key={idx}>
                {Object.entries(item).map(([k, v]) => (
                  <Field key={k} label={k} value={Array.isArray(v) ? v.join(', ') : v} />
                ))}
              </Card>
            ))}
          </Box>
        ))}
      </Section>

      {/* Career Progression */}
      <Section title="Career Progression">
        {(careerProgression?.placement || []).map((offer, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Offer {i + 1}</Typography>
            {Object.entries(offer).map(([key, value]) => (
              <Field key={key} label={key} value={value} />
            ))}
          </Box>
        ))}
        {(careerProgression?.exams || []).map((exam, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Exam {i + 1}</Typography>
            {Object.entries(exam).map(([key, value]) => (
              <Field key={key} label={key} value={value} />
            ))}
          </Box>
        ))}
        {careerProgression?.higherStudy && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Higher Studies</Typography>
            {Object.entries(careerProgression.higherStudy).map(([k, v]) => (
              <Field key={k} label={k} value={v} />
            ))}
          </Box>
        )}
        {careerProgression?.startup && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Startup</Typography>
            {Object.entries(careerProgression.startup).map(([k, v]) => (
              <Field key={k} label={k} value={v} />
            ))}
          </Box>
        )}
      </Section>

      {/* Miscellaneous */}
      <Section title="Miscellaneous">
        {Object.entries(miscellaneous || {}).map(([key, val]) => (
          <Field key={key} label={key} value={val} />
        ))}
      </Section>
    </Box>
  );
};

export default StudentProfile;
