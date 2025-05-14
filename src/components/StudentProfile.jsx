import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Grid, Box, Divider, Chip,
  Button
} from '@mui/material';
import FilePreviewOverlay from './FilePreview';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

  const [showfile,setshowfile]=useState(null);

  return (
    <Box p={3}>
        <Button
  variant="text" 
  onClick={onClose}
   startIcon={<ArrowBackIcon />}  
  sx={{
    textTransform: 'none',
    fontWeight: 'medium',
    color: 'text.primary',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  }}
>
  Back
</Button>
      {/* Basic Info */}
      <Section title="Basic Information">
        <Field label="Name" value={name} />
        <Field label="Mobile No" value={mobileNo} />
        <Field label="Email" value={email} />
        <Field label="Roll Number" value={rollNumber} />
      </Section>

      {/* Personal Info */}
      <Section title="Personal Information">
        {Object.entries(personalInfo || {}).filter(([key]) => key !== '_id').map(([key, val]) => (
          <Field key={key} label={key} value={val} />
        ))}
      </Section>

      {/* Enrollment Details */}
      <Section title="Enrollment Details">
        {Object.entries(enrollmentDetails || {}).filter(([key]) => key !== '_id').map(([key, val]) => (
          <Field key={key} label={key} value={val} />
        ))}
      </Section>

      {/* Academic Background */}
      <Section title="Academic Background">
        {Object.entries(academicBackground || {}).filter(([key]) => key !== '_id').map(([key, val]) => (
          <Field key={key} label={key} value={val} />
        ))}
      </Section>

      {/* Academic Info */}
      <Section title="Academic Info">
        {(academicInfo?.grades || []).map((grade, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Semester {grade.semester}</Typography>
            <Field label="SGPA" value={grade.sgpa} />
           <Button variant="outlined" onClick={() => setshowfile(grade.gradecard)}>
  View Gradecard
</Button>
          </Box>
        ))}
        {/* Projects */}
{(academicInfo?.projects || []).map((proj, i) => (
  <Card variant="outlined" sx={{ my: 2, p: 2 }} key={i}>
    <Typography variant="subtitle1">Project {i + 1}</Typography>
    {Object.entries(proj)
      .filter(([key]) => key !== '_id' && key !== 'certificate' && key !== 'projects')
      .map(([k, v]) => (
        <Field key={k} label={k} value={v} />
      ))}
    {proj.certificate && (
      <Button variant="outlined" onClick={() => setshowfile(proj.certificate)}>
        View Certificate
      </Button>
    )}
  </Card>
))}

{/* Courses */}
{(academicInfo?.courses || []).map((course, i) => (
  <Card variant="outlined" sx={{ my: 2, p: 2 }} key={i}>
    <Typography variant="subtitle1">Course {i + 1}</Typography>
    {Object.entries(course)
      .filter(([key]) => key !== '_id' && key !== 'certificate' && key !== 'gradeCard')
      .map(([k, v]) => (
        <Field key={k} label={k} value={v?.toString()} />
      ))}
    {course.gradeCard && (
      <Button variant="outlined" onClick={() => setshowfile(course.gradeCard)}>
        View Gradecard
      </Button>
    )}
    {course.certificate && (
      <Button variant="outlined" onClick={() => setshowfile(course.certificate)}>
        View Certificate
      </Button>
    )}
  </Card>
))}

{/* Trainings */}
{(academicInfo?.trainings || []).map((training, i) => (
  <Card variant="outlined" sx={{ my: 2, p: 2 }} key={i}>
    <Typography variant="subtitle1">Training {i + 1}</Typography>
    {Object.entries(training)
      .filter(([key]) => key !== '_id' && key !== 'certificate')
      .map(([k, v]) => (
        <Field key={k} label={k} value={v?.toString()} />
      ))}
    {training.certificate && (
      <Button variant="outlined" onClick={() => setshowfile(training.certificate)}>
        View Certificate
      </Button>
    )}
  </Card>
))}

{/* Internships */}
{(academicInfo?.interns || []).map((intern, i) => (
  <Card variant="outlined" sx={{ my: 2, p: 2 }} key={i}>
    <Typography variant="subtitle1">Internship {i + 1}</Typography>
    {Object.entries(intern)
      .filter(([key]) => key !== '_id' && key !== 'certificate')
      .map(([k, v]) => (
        <Field key={k} label={k} value={v?.toString()} />
      ))}
    {intern.certificate && (
      <Button variant="outlined" onClick={() => setshowfile(intern.certificate)}>
        View Certificate
      </Button>
    )}
  </Card>
))}

{/* Publications */}
{academicInfo?.publications?.journalPapers?.map((paper, i) => (
  <Card variant="outlined" sx={{ my: 2, p: 2 }} key={`journal-${i}`}>
    <Typography variant="subtitle1">Journal Paper {i + 1}</Typography>
    {Object.entries(paper)
      .filter(([key]) => key !== '_id')
      .map(([k, v]) => (
        <Field key={k} label={k} value={v} />
      ))}
  </Card>
))}

{academicInfo?.publications?.conferencePapers?.map((paper, i) => (
  <Card variant="outlined" sx={{ my: 2, p: 2 }} key={`conf-${i}`}>
    <Typography variant="subtitle1">Conference Paper {i + 1}</Typography>
    {Object.entries(paper)
      .filter(([key]) => key !== '_id')
      .map(([k, v]) => (
        <Field key={k} label={k} value={v} />
      ))}
  </Card>
))}

{academicInfo?.publications?.patent?.map((pat, i) => (
  <Card variant="outlined" sx={{ my: 2, p: 2 }} key={`patent-${i}`}>
    <Typography variant="subtitle1">Patent {i + 1}</Typography>
    {Object.entries(pat)
      .filter(([key]) => key !== '_id' && key !== 'certificate')
      .map(([k, v]) => (
        <Field key={k} label={k} value={v} />
      ))}
    {pat.certificate && (
      <Button variant="outlined" onClick={() => setshowfile(pat.certificate)}>
        View Certificate
      </Button>
    )}
  </Card>
))}

{/* Remedial */}
{(academicInfo?.remedial || []).map((item, i) => (
  <Card variant="outlined" sx={{ my: 2, p: 2 }} key={`remedial-${i}`}>
    <Typography variant="subtitle1">Remedial {i + 1}</Typography>
    {Object.entries(item)
      .filter(([key]) => key !== '_id')
      .map(([k, v]) => (
        <Field key={k} label={k} value={v?.toString()} />
      ))}
  </Card>
))}

        <FilePreviewOverlay file={showfile} onClose={()=>{setshowfile(null)}}/>
        {/* Additional sections like projects, courses, etc., can be mapped similarly */}
      </Section>

      {/* Co-Curricular Info */}
      <Section title="Co-Curricular Activities">
        {['clubs', 'techFests', 'leadership', 'sports', 'skills', 'socialActivities', 'seminars'].map(cat => (
          <Box key={cat} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>{cat}</Typography>
            {(curricularInfo?.[cat] || []).map((item, idx) => (
              <Card variant="outlined" sx={{ my: 1, p: 1 }} key={idx}>
                {Object.entries(item).filter(([key]) => key !== '_id').filter(([key]) => key !== 'certificate').map(([k, v]) => (
                  <Field key={k} label={k} value={Array.isArray(v) ? v.join(', ') : v} />
                  
                ))}
                 {item.certificate &&(<Button variant="outlined" onClick={() => setshowfile(item.certificate)}>
  View Certificate
</Button>)}
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
           {Object.entries(offer)
  .filter(([key]) => key !== 'offerLetter').filter(([key]) => key !== '_id')
  .map(([key, value]) => (
    <Field key={key} label={key} value={value} />
))}
             <Button variant="outlined" onClick={() => setshowfile(offer.offerLetter)}>
  View Offer Letter
</Button>
          </Box>
        ))}
        {(careerProgression?.exams || []).map((exam, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Exam {i + 1}</Typography>
            {Object.entries(exam).filter(([key]) => key !== 'rankCard').filter(([key]) => key !== '_id').map(([key, value]) => (
              <Field key={key} label={key} value={value} />
            ))}
             <Button variant="outlined" onClick={() => setshowfile(exam.rankCard)}>
  View Rank Card
</Button>
          </Box>
        ))}
        {careerProgression?.higherStudy && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Higher Studies</Typography>
            {Object.entries(careerProgression.higherStudy).filter(([key]) => key !== '_id').filter(([key]) => key !== 'letter').map(([k, v]) => (
              <Field key={k} label={k} value={v} />
            ))}
            <Button variant="outlined" onClick={() => setshowfile(careerProgression.higherStudy.letter)}>
  View Acceptance Letter
</Button>
          </Box>
        )}
        {careerProgression?.startup && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Startup</Typography>
            {Object.entries(careerProgression.startup).filter(([key]) => key !== '_id').map(([k, v]) => (
              <Field key={k} label={k} value={v} />
            ))}
          </Box>
        )}
      </Section>

      {/* Miscellaneous */}
      <Section title="Miscellaneous">
        {Object.entries(miscellaneous || {}).filter(([key]) => key !== '_id').filter(([key]) => key !== 'lor').map(([key, val]) => (
          <Field key={key} label={key} value={val} />
        ))}
        
      </Section>
    </Box>
  );
};

export default StudentProfile;
