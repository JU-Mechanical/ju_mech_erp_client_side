"use client";
import React from "react";
import { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Divider,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import FileUploadField from "../pages/file-upload-field";
import { CloudUpload, Cancel, CloudDone } from "@mui/icons-material";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`progression-tabpanel-${index}`}
      aria-labelledby={`progression-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProgressionForm({ formData, handleChange }) {
  const [tabValue, setTabValue] = useState(0);
  const [ifPlaced, setIfPlaced] = useState(false);
  const [hasTraining, setHasTraining] = useState(false);
  const [startupOptions, setStartupOptions] = useState({
    associated: false,
    interested: false,
  });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle placement changes
  const handleIsPlaced = (field) => {
    setIfPlaced(field);
    if (field && (!formData.placements || formData.placements.length === 0)) {
      handleChange({
        target: {
          name: "placements",
          value: [
            {
              company: "",
              position: "",
              employmentType: "",
              recruitmentType: "",
              year: "",
              package: "",
              offerLetter: null,
            },
          ],
        },
      });
    }
  };

  const handleOfferChange = (index, field, value) => {
    const updatedOffers = formData.placements.map((placement, i) =>
      i === index ? { ...placement, [field]: value } : placement
    );
    handleChange({ target: { name: "placements", value: updatedOffers } });
  };

  const addOffer = () => {
    const newOffers = [
      ...(formData.placements || []),
      {
        company: "",
        position: "",
        employmentType: "",
        recruitmentType: "",
        year: "",
        package: "",
        offerLetter: null,
      },
    ];
    handleChange({ target: { name: "placements", value: newOffers } });
  };

  const removeOffer = (index) => {
    const modifiedOffers = formData.placements.filter((_, i) => i !== index);
    handleChange({ target: { name: "placements", value: modifiedOffers } });
  };

  // Handle competitive exam changes
  const handleHasTraining = (field) => {
    setHasTraining(field);
  };

  const handleExamChange = (index, field, value) => {
    const updatedExam = formData.competitiveExam.map((exam, i) =>
      i === index ? { ...exam, [field]: value } : exam
    );
    handleChange({ target: { name: "competitiveExam", value: updatedExam } });
  };

  const addExam = () => {
    const newExam = [
      ...formData.competitiveExam,
      {
        examinationName: "",
        year: "",
        score: "",
        rank: "",
        percentile: "",
        trainingType: "",
        trainingMode: "",
        rankCard: null,
      },
    ];
    handleChange({ target: { name: "competitiveExam", value: newExam } });
  };

  const removeExam = (index) => {
    const modifiedExam = formData.competitiveExam.filter((_, i) => i !== index);
    handleChange({ target: { name: "competitiveExam", value: modifiedExam } });
  };

  // Handle higher study changes
  const handleHigherStudyChange = (field, value) => {
    const updatedHigherStudy = {
      ...formData.higherStudy,
      [field]: value,
    };
    handleChange({
      target: { name: "higherStudy", value: updatedHigherStudy },
    });
  };

  // Handle startup changes
  const handleStartupOptionsChange = (field, option) => {
    setStartupOptions((prevState) => ({
      ...prevState,
      [option]: field,
    }));
  };

  const handleStartupChange = (field, value) => {
    const updatedStartUp = {
      ...formData.startup,
      [field]: value,
    };
    handleChange({
      target: { name: "startup", value: updatedStartUp },
    });
  };

  // Handle file upload for competitive exams
  function Uploadcompet(index) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.jpg,.png";
    input.onchange = (event) => {
      const file = event.target.files[0];
      // You'll need to implement uploadFileToCloudinary or similar function
      uploadFileToCloudinary(file).then((url) => {
        const updatedExam = [...formData.competitiveExam];
        updatedExam[index].rankCard = url;
        handleChange({ target: { name: "competitiveExam", value: updatedExam } });
      });
    };
    input.click();
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Progression/Placement/Competitive Examinations
      </Typography>
      <Divider className="mb-4" />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="progression tabs"
        >
          <Tab label="Placement" />
          <Tab label="Competitive Exams" />
          <Tab label="Higher Study" />
          <Tab label="Startups" />
        </Tabs>
      </Box>

      {/* Placement Tab */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" gutterBottom>
          Placement Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={ifPlaced}
                  onChange={(e) => handleIsPlaced(e.target.checked)}
                />
              }
              label="Whether Placed"
            />
          </Grid>
        </Grid>

        {ifPlaced && (
          <>
            {formData.placements?.map((placement, index) => (
              <Paper key={index} className="p-4 mb-4" sx={{ mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      value={placement.company || ""}
                      onChange={(e) =>
                        handleOfferChange(index, "company", e.target.value)
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Position"
                      value={placement.position || ""}
                      onChange={(e) =>
                        handleOfferChange(index, "position", e.target.value)
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="CTC (LPA)"
                      value={placement.package || ""}
                      onChange={(e) =>
                        handleOfferChange(index, "package", e.target.value)
                      }
                      type="number"
                      inputProps={{ step: 0.01 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Employment Type</InputLabel>
                      <Select
                        value={placement.employmentType || ""}
                        onChange={(e) =>
                          handleOfferChange(
                            index,
                            "employmentType",
                            e.target.value
                          )
                        }
                        label="Employment Type"
                      >
                        <MenuItem value="contractual">Contractual</MenuItem>
                        <MenuItem value="permanent">Permanent</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Recruitment Type</InputLabel>
                      <Select
                        value={placement.recruitmentType || ""}
                        onChange={(e) =>
                          handleOfferChange(
                            index,
                            "recruitmentType",
                            e.target.value
                          )
                        }
                        label="Recruitment Type"
                      >
                        <MenuItem value="inCampus">In-Campus</MenuItem>
                        <MenuItem value="offCampus">Off-Campus</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Year of Offer"
                      value={placement.year || ""}
                      onChange={(e) =>
                        handleOfferChange(index, "year", e.target.value)
                      }
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FileUploadField
                      label="Upload Offer Letter (if any)"
                      onChange={(files) =>
                        handleOfferChange(index, "offerLetter", files[0])
                      }
                    />
                  </Grid>

                  <Grid item xs={12} className="flex justify-end">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => removeOffer(index)}
                      disabled={formData.placements.length === 1}
                    >
                      Remove Offer
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))}

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={addOffer}
              className="mb-4"
            >
              Add Offer
            </Button>
          </>
        )}
      </TabPanel>

      {/* Competitive Exams Tab */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          Competitive Examinations
        </Typography>

        {formData.competitiveExam?.map((exam, index) => (
          <Paper key={index} className="p-4 mb-4" sx={{ mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Examination Name"
                  value={exam.examinationName || ""}
                  onChange={(e) =>
                    handleExamChange(index, "examinationName", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Year"
                  value={exam.year || ""}
                  onChange={(e) =>
                    handleExamChange(index, "year", e.target.value)
                  }
                  type="number"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Score"
                  value={exam.score || ""}
                  onChange={(e) =>
                    handleExamChange(index, "score", e.target.value)
                  }
                  type="number"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Rank"
                  value={exam.rank || ""}
                  onChange={(e) =>
                    handleExamChange(index, "rank", e.target.value)
                  }
                  type="number"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Percentile"
                  value={exam.percentile || ""}
                  onChange={(e) =>
                    handleExamChange(index, "percentile", e.target.value)
                  }
                  type="number"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasTraining}
                      onChange={(e) => handleHasTraining(e.target.checked)}
                    />
                  }
                  label="Specific training/Guidance for the examination"
                />
              </Grid>

              {hasTraining && (
                <>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Training Type</InputLabel>
                      <Select
                        value={exam.trainingMode || ""}
                        onChange={(e) =>
                          handleExamChange(index, "trainingMode", e.target.value)
                        }
                        label="Training Type"
                      >
                        <MenuItem value="In-House">In-house</MenuItem>
                        <MenuItem value="Outside/Online">
                          Outside/Online
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Training Type</InputLabel>
                      <Select
                        value={exam.trainingType || ""}
                        onChange={(e) =>
                          handleExamChange(index, "trainingType", e.target.value)
                        }
                        label="Training Type"
                      >
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Unpaid">Unpaid</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                {!exam.rankCard ? (
                  <IconButton onClick={() => Uploadcompet(index)}>
                    <CloudUpload />
                  </IconButton>
                ) : (
                  <IconButton>
                    <CloudDone />
                  </IconButton>
                )}
              </Grid>

              <Grid item xs={12} className="flex justify-end">
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => removeExam(index)}
                  disabled={formData.competitiveExam.length === 1}
                >
                  Remove Exam
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={addExam}
          className="mb-4"
        >
          Add Exam
        </Button>
      </TabPanel>

      {/* Higher Study Tab */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>
          Higher Study
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Programme</InputLabel>
              <Select
                value={formData.higherStudy?.programme || ""}
                onChange={(e) =>
                  handleHigherStudyChange("programme", e.target.value)
                }
                label="Programme"
              >
                <MenuItem value="mtech">M.Tech</MenuItem>
                <MenuItem value="ms">MS</MenuItem>
                <MenuItem value="phd">Ph.D</MenuItem>
                <MenuItem value="mba">MBA</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tenure(in yrs)"
              value={formData.higherStudy?.duration || ""}
              onChange={(e) =>
                handleHigherStudyChange("duration", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Institute/University"
              value={formData.higherStudy?.institute || ""}
              onChange={(e) =>
                handleHigherStudyChange("institute", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Country"
              value={formData.higherStudy?.country || ""}
              onChange={(e) =>
                handleHigherStudyChange("country", e.target.value)
              }
            />
          </Grid>
        </Grid>
      </TabPanel>

      {/* Startups Tab */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6" gutterBottom>
          Startups/Entrepreneurship Initiatives
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={startupOptions.associated}
                  onChange={(e) =>
                    handleStartupOptionsChange(e.target.checked, "associated")
                  }
                />
              }
              label="Associated with/developed any startups/entrepreneurship initiative"
            />
          </Grid>

          {startupOptions.associated && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Details of the startup/entrepreneurship initiative: Name, objective, investment etc."
                value={formData.startup?.details || ""}
                onChange={(e) => handleStartupChange("details", e.target.value)}
                multiline
                rows={3}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={startupOptions.interested}
                  onChange={(e) =>
                    handleStartupOptionsChange(e.target.checked, "interested")
                  }
                />
              }
              label="Whether interested to form startups/entrepreneurship initiative in future"
            />
          </Grid>

          {startupOptions.interested && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Is there any support from the University"
                  value={formData.startup?.support || ""}
                  onChange={(e) => handleStartupChange("support", e.target.value)}
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Is there any external support"
                  value={formData.startup?.externalSupport || ""}
                  onChange={(e) =>
                    handleStartupChange("externalSupport", e.target.value)
                  }
                  multiline
                  rows={2}
                />
              </Grid>
            </>
          )}
        </Grid>
      </TabPanel>
    </Box>
  );
}