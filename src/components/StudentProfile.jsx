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

    // Add a white background for PDF for better print style
    const originalBg = input.style.background;
    input.style.background = "#fff";

    // Optionally, add a border or shadow for PDF
    input.style.boxShadow = "0 0 0 #fff";
    input.style.padding = "24px";
    input.style.borderRadius = "12px";

    // Use html2canvas to render with higher quality and print-friendly style
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fff",
      // Remove box-shadow for print
      ignoreElements: (el) => el.classList && el.classList.contains("no-print"),
    });

    // Restore original style
    input.style.background = originalBg;
    input.style.boxShadow = "";
    input.style.padding = "";
    input.style.borderRadius = "";

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let pageHeight = pdf.internal.pageSize.getHeight();

    if (pdfHeight <= pageHeight) {
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    } else {
      let renderedHeight = 0;
      while (renderedHeight < pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, -renderedHeight, pdfWidth, pdfHeight);
        renderedHeight += pageHeight;
        if (renderedHeight < pdfHeight) {
          pdf.addPage();
        }
      }
    }
    pdf.save(`${user.name || "student"}_profile.pdf`);
  };

  return (
    <Box
      p={3}
      sx={{
        background: "linear-gradient(135deg, #fff 60%, #fbeaec 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Note for all users, responsive styling */}
      <Typography
        variant="body2"
        sx={{
          color: "#b70924",
          fontWeight: 500,
          mb: { xs: 2, md: 1 },
          background: "rgba(247, 232, 232, 0.6)",
          px: { xs: 1.5, md: 2 },
          py: { xs: 1, md: 1 },
          borderRadius: 2,
          maxWidth: { xs: "100%", md: 400 },
          fontSize: { xs: "0.98rem", md: "1rem" },
          textAlign: { xs: "center", md: "left" },
          mx: { xs: "auto", md: 0 },
        }}
      >
        Note: For best results, download PDF while in desktop view.
      </Typography>
      <Button
        variant="text"
        onClick={onClose}
        startIcon={<ArrowBackIcon />}
        sx={{
          textTransform: "none",
          fontWeight: "medium",
          color: "#b70924",
          fontSize: "1.1rem",
          borderRadius: 2,
          px: 2,
          py: 1,
          mb: 2,
          background: "rgba(247, 232, 232, 0.6)",
          "&:hover": {
            background: "#fbeaec",
            color: "#fff",
          },
        }}
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
          ml: 2,
          mb: 2,
          background: "#b70924",
          fontWeight: 700,
          borderRadius: 2,
          px: 3,
          py: 1,
          fontSize: "1.05rem",
          boxShadow: "0 2px 8px 0 rgba(183,9,36,0.08)",
          "&:hover": {
            background: "#a1071f",
          },
        }}
        onClick={handleDownloadPDF}
      >
        Download PDF
      </Button>
      <div
        ref={profileRef}
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 2px 16px 0 rgba(183,9,36,0.09)",
          padding: "32px 18px",
          marginTop: 16,
          marginBottom: 16,
          maxWidth: 900,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
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
          {/*
            "clubs",
            "techFests",
            "leadership",
            "sports",
            "skills",
            "socialActivities",
            "seminars",
          */}
          {[
            "clubs",
            "techFests",
            "leadership",
            "sports",
            "skills",
            "socialActivities",
            "seminars",
          ].map((cat) => (
            <Box
              key={cat}
              sx={{
                mb: 2,
                background: "#f9f6f8",
                borderRadius: 2,
                boxShadow: "0 1px 6px 0 rgba(183,9,36,0.07)",
                px: 2,
                py: 1.5,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 700,
                  color: "#b70924",
                  letterSpacing: 0.5,
                  mb: 1,
                  fontSize: "1.08rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#b70924",
                    marginRight: 8,
                  }}
                ></span>
                {cat.replace(/([A-Z])/g, " $1")}
              </Typography>
              {(curricularInfo?.[cat] || []).length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 2 }}
                >
                  No entries
                </Typography>
              ) : (
                (curricularInfo?.[cat] || []).map((item, idx) => (
                  <Card
                    variant="outlined"
                    sx={{
                      my: 1,
                      p: 1.5,
                      borderRadius: 2,
                      borderColor: "#b70924",
                      background: "#fff",
                      boxShadow: "0 1px 4px 0 rgba(183,9,36,0.04)",
                    }}
                    key={idx}
                  >
                    {Object.entries(item)
                      .filter(([key]) => key !== "_id")
                      .filter(([key]) => key !== "certificate")
                      .map(([k, v]) => (
                        <Box key={k} sx={{ mb: 0.5 }}>
                          <Typography
                            component="span"
                            sx={{
                              fontWeight: 600,
                              color: "#b70924",
                              fontSize: "0.98em",
                              mr: 1,
                            }}
                          >
                            {k.replace(/([A-Z])/g, " $1")}:
                          </Typography>
                          <Typography
                            component="span"
                            sx={{
                              color: "#222",
                              fontSize: "0.98em",
                            }}
                          >
                            {Array.isArray(v) ? v.join(", ") : v}
                          </Typography>
                        </Box>
                      ))}
                    {item.certificate && (
                      <Button
                        variant="outlined"
                        onClick={() => setshowfile(item.certificate)}
                        sx={{
                          mt: 1,
                          borderColor: "#b70924",
                          color: "#b70924",
                          fontWeight: 600,
                          "&:hover": {
                            background: "#fbeaec",
                            borderColor: "#b70924",
                          },
                        }}
                      >
                        View Certificate
                      </Button>
                    )}
                  </Card>
                ))
              )}
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
