import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import FilePreviewOverlay from "./FilePreview";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Helper component to render labeled data
const Field = ({ label, value }) => (
  <Grid container spacing={1} sx={{ mb: 1 }}>
    <Grid item xs={4}>
      <Typography fontWeight="bold">{label}</Typography>
    </Grid>
    <Grid item xs={8}>
      <Typography>{value ?? "—"}</Typography>
    </Grid>
  </Grid>
);

// Helper to render sections
const Section = ({ title, children }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </CardContent>
  </Card>
);

const StudentProfile = ({ user, onClose }) => {
  if (!user) return <Typography>No user data</Typography>;

  const {
    name,
    mobileNo,
    email,
    rollNumber,
    personalInfo,
    enrollmentDetails,
    academicBackground,
    academicInfo,
    curricularInfo,
    careerProgression,
    miscellaneous,
  } = user;

  const [showfile, setshowfile] = useState(null);
  const profileRef = useRef();

  // PDF generation handler
  const handleDownloadPDF = async () => {
    const input = profileRef.current;
    if (!input) return;
    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${user.name || "student"}_profile.pdf`);
  };

  return (
    <Box p={3}>
      <Button
        variant="text"
        onClick={onClose}
        startIcon={<ArrowBackIcon />}
        sx={{
          textTransform: "none",
          fontWeight: "medium",
          color: "#b70924"}}
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ ml: 2, mb: 2 }}
        onClick={handleDownloadPDF}
      >
        Download PDF
      </Button>
      <div ref={profileRef}>
        {/* Basic Info */}
        <Section title="Basic Information">
          <Field label="Name" value={name} />
          <Field label="Mobile No" value={mobileNo} />
          <Field label="Email" value={email} />
          <Field label="Roll Number" value={rollNumber} />
        </Section>

        {/* Personal Info */}
        <Section title="Personal Information">
          {Object.entries(personalInfo || {})
            .filter(([key]) => key !== "_id")
            .map(([key, val]) => (
              <Field key={key} label={key} value={val} />
            ))}
        </Section>

        {/* Enrollment Details */}
        <Section title="Enrollment Details">
          {Object.entries(enrollmentDetails || {})
            .filter(([key]) => key !== "_id")
            .map(([key, val]) => (
              <Field key={key} label={key} value={val} />
            ))}
        </Section>

        {/* Academic Background */}
        <Section title="Academic Background">
          {Object.entries(academicBackground || {})
            .filter(([key]) => key !== "_id")
            .map(([key, val]) => (
              <Field key={key} label={key} value={val} />
            ))}
        </Section>

        {/* Academic Info */}
        <Section title="Academic Info">
          {(academicInfo?.grades || []).map((grade, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                Semester {grade.semester}
              </Typography>
              <Field label="SGPA" value={grade.sgpa} />
              {grade.gardecard && (
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => setshowfile(grade.gradecard)}
                  >
                    View Gradecard
                  </Button>
                  {/* Download link if gradecard is a URL */}
                  {typeof grade.gradecard === "string" && (
                    <Button
                      variant="text"
                      component="a"
                      href={grade.gradecard}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ ml: 1 }}
                      download
                    >
                      Download
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          ))}
          {/* Projects */}
          {(academicInfo?.projects || []).map((proj, i) => (
            <Card variant="outlined" sx={{ my: 2, p: 2 }} key={i}>
              <Typography variant="subtitle1">Project {i + 1}</Typography>
              {Object.entries(proj)
                .filter(
                  ([key]) =>
                    key !== "_id" && key !== "certificate" && key !== "projects"
                )
                .map(([k, v]) => (
                  <Field key={k} label={k} value={v} />
                ))}
              {proj.certificate && (
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => setshowfile(proj.certificate)}
                  >
                    View Certificate
                  </Button>
                  {typeof proj.certificate === "string" && (
                    <Button
                      variant="text"
                      component="a"
                      href={proj.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ ml: 1 }}
                      download
                    >
                      Download
                    </Button>
                  )}
                </Box>
              )}
            </Card>
          ))}
          {/* Courses */}
          {(academicInfo?.courses || []).map((course, i) => (
            <Card variant="outlined" sx={{ my: 2, p: 2 }} key={i}>
              <Typography variant="subtitle1">Course {i + 1}</Typography>
              {Object.entries(course)
                .filter(
                  ([key]) =>
                    key !== "_id" &&
                    key !== "certificate" &&
                    key !== "gradeCard"
                )
                .map(([k, v]) => (
                  <Field key={k} label={k} value={v?.toString()} />
                ))}
              {course.gradeCard && (
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => setshowfile(course.gradeCard)}
                  >
                    View Gradecard
                  </Button>
                  {typeof course.gradeCard === "string" && (
                    <Button
                      variant="text"
                      component="a"
                      href={course.gradeCard}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ ml: 1 }}
                      download
                    >
                      Download
                    </Button>
                  )}
                </Box>
              )}
              {course.certificate && (
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => setshowfile(course.certificate)}
                  >
                    View Certificate
                  </Button>
                  {typeof course.certificate === "string" && (
                    <Button
                      variant="text"
                      component="a"
                      href={course.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ ml: 1 }}
                      download
                    >
                      Download
                    </Button>
                  )}
                </Box>
              )}
            </Card>
          ))}
          {/* Trainings */}
          {(academicInfo?.trainings || []).map((training, i) => (
            <Card variant="outlined" sx={{ my: 2, p: 2 }} key={i}>
              <Typography variant="subtitle1">Training {i + 1}</Typography>
              {Object.entries(training)
                .filter(([key]) => key !== "_id" && key !== "certificate")
                .map(([k, v]) => (
                  <Field key={k} label={k} value={v?.toString()} />
                ))}
              {training.certificate && (
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => setshowfile(training.certificate)}
                  >
                    View Certificate
                  </Button>
                  {typeof training.certificate === "string" && (
                    <Button
                      variant="text"
                      component="a"
                      href={training.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ ml: 1 }}
                      download
                    >
                      Download
                    </Button>
                  )}
                </Box>
              )}
            </Card>
          ))}
          {/* Internships */}
          {(academicInfo?.interns || []).map((intern, i) => (
            <Card variant="outlined" sx={{ my: 2, p: 2 }} key={i}>
              <Typography variant="subtitle1">Internship {i + 1}</Typography>
              {Object.entries(intern)
                .filter(([key]) => key !== "_id" && key !== "certificate")
                .map(([k, v]) => (
                  <Field key={k} label={k} value={v?.toString()} />
                ))}
              {intern.certificate && (
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => setshowfile(intern.certificate)}
                  >
                    View Certificate
                  </Button>
                  {typeof intern.certificate === "string" && (
                    <Button
                      variant="text"
                      component="a"
                      href={intern.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ ml: 1 }}
                      download
                    >
                      Download
                    </Button>
                  )}
                </Box>
              )}
            </Card>
          ))}
          {/* Publications */}
          {academicInfo?.publications?.journalPapers?.map((paper, i) => (
            <Card variant="outlined" sx={{ my: 2, p: 2 }} key={`journal-${i}`}>
              <Typography variant="subtitle1">Journal Paper {i + 1}</Typography>
              {Object.entries(paper)
                .filter(([key]) => key !== "_id")
                .map(([k, v]) => (
                  <Field key={k} label={k} value={v} />
                ))}
            </Card>
          ))}
          {academicInfo?.publications?.conferencePapers?.map((paper, i) => (
            <Card variant="outlined" sx={{ my: 2, p: 2 }} key={`conf-${i}`}>
              <Typography variant="subtitle1">
                Conference Paper {i + 1}
              </Typography>
              {Object.entries(paper)
                .filter(([key]) => key !== "_id")
                .map(([k, v]) => (
                  <Field key={k} label={k} value={v} />
                ))}
            </Card>
          ))}
          {academicInfo?.publications?.patent?.map((pat, i) => (
            <Card variant="outlined" sx={{ my: 2, p: 2 }} key={`patent-${i}`}>
              <Typography variant="subtitle1">Patent {i + 1}</Typography>
              {Object.entries(pat)
                .filter(([key]) => key !== "_id" && key !== "certificate")
                .map(([k, v]) => (
                  <Field key={k} label={k} value={v} />
                ))}
              {pat.certificate && (
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => setshowfile(pat.certificate)}
                  >
                    View Certificate
                  </Button>
                  {typeof pat.certificate === "string" && (
                    <Button
                      variant="text"
                      component="a"
                      href={pat.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ ml: 1 }}
                      download
                    >
                      Download
                    </Button>
                  )}
                </Box>
              )}
            </Card>
          ))}
          {/* Remedial */}
          {(academicInfo?.remedial || []).map((item, i) => (
            <Card variant="outlined" sx={{ my: 2, p: 2 }} key={`remedial-${i}`}>
              <Typography variant="subtitle1">Remedial {i + 1}</Typography>
              {Object.entries(item)
                .filter(([key]) => key !== "_id")
                .map(([k, v]) => (
                  <Field key={k} label={k} value={v?.toString()} />
                ))}
            </Card>
          ))}
          <FilePreviewOverlay
            file={showfile}
            onClose={() => {
              setshowfile(null);
            }}
          />
        </Section>

        {/* Co-Curricular Info */}
        <Section title="Co-Curricular Activities">
          {[
            "clubs",
            "techFests",
            "leadership",
            "sports",
            "skills",
            "socialActivities",
            "seminars",
          ].map((cat) => (
            <Box key={cat} sx={{ mb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ textTransform: "capitalize" }}
              >
                {cat}
              </Typography>
              {(curricularInfo?.[cat] || []).map((item, idx) => (
                <Card variant="outlined" sx={{ my: 1, p: 1 }} key={idx}>
                  {Object.entries(item)
                    .filter(([key]) => key !== "_id")
                    .filter(([key]) => key !== "certificate")
                    .map(([k, v]) => (
                      <Field
                        key={k}
                        label={k}
                        value={Array.isArray(v) ? v.join(", ") : v}
                      />
                    ))}
                  {item.certificate && (
                    <Button
                      variant="outlined"
                      onClick={() => setshowfile(item.certificate)}
                    >
                      View Certificate
                    </Button>
                  )}
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
                .filter(([key]) => key !== "offerLetter")
                .filter(([key]) => key !== "_id")
                .map(([key, value]) => (
                  <Field key={key} label={key} value={value} />
                ))}
              {offer.offerLetter && (
                <Button
                  variant="outlined"
                  onClick={() => setshowfile(offer.offerLetter)}
                >
                  View Offer Letter
                </Button>
              )}
            </Box>
          ))}
          {(careerProgression?.exams || []).map((exam, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Exam {i + 1}</Typography>
              {Object.entries(exam)
                .filter(([key]) => key !== "rankCard")
                .filter(([key]) => key !== "_id")
                .map(([key, value]) => (
                  <Field key={key} label={key} value={value} />
                ))}
              {exam.rankCard && (
                <Button
                  variant="outlined"
                  onClick={() => setshowfile(exam.rankCard)}
                >
                  View Rank Card
                </Button>
              )}
            </Box>
          ))}
          {careerProgression?.higherStudy && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Higher Studies</Typography>
              {Object.entries(careerProgression.higherStudy)
                .filter(([key]) => key !== "_id")
                .filter(([key]) => key !== "letter")
                .map(([k, v]) => (
                  <Field key={k} label={k} value={v} />
                ))}
              {careerProgression?.higherStudy?.letter && (
                <Button
                  variant="outlined"
                  onClick={() =>
                    setshowfile(careerProgression.higherStudy.letter)
                  }
                >
                  View Acceptance Letter
                </Button>
              )}
            </Box>
          )}
          {careerProgression?.startup && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Startup</Typography>
              {Object.entries(careerProgression.startup)
                .filter(([key]) => key !== "_id")
                .map(([k, v]) => (
                  <Field key={k} label={k} value={v} />
                ))}
            </Box>
          )}
        </Section>

        {/* Miscellaneous */}
        <Section title="Miscellaneous">
          {Object.entries(miscellaneous || {})
            .filter(([key]) => key !== "_id")
            .filter(([key]) => key !== "lor")
            .map(([key, val]) => (
              <Field key={key} label={key} value={val} />
            ))}
        </Section>
      </div>
    </Box>
  );
};

export default StudentProfile;
