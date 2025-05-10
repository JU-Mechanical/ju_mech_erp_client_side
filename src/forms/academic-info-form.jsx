"use client";

import { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Divider,
  Box,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  useMediaQuery,
} from "@mui/material";
import {
  Add,
  Delete,
  CloudUpload,
  Cancel,
  CloudDone,
} from "@mui/icons-material";
import { uploadFileToCloudinary } from "../helpers/uploadfiles";
import CircularProgress from "../components/Loading";
import Loader from "../components/Loading";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

//* List of Electives (Professional & Open)
const electivesList = ["Elective 1", "Elective 2", "Elective 3", "Elective 4"];
const openElectivesList = [
  "Open Elective 1",
  "Open Elective 2",
  "Open Elective 3",
];

export default function AcademicInfoForm({ formData, handleChange }) {
  //* State variables
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [loading, setloading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const addSemester = () => {
    const newSem = [
      ...formData.grades,
      { semester: formData.grades.length + 1, sgpa: "", cgpa: "", gradecard: null },
    ];
    handleChange({ target: { name: "grades", value: newSem } });
  };

  //? Adding of Professional elective
  const handleProfessionalChange = (event) => {
    const newElective = event.target.value;

    // Ensure we don't add duplicates
    if (!formData.selectedProfessional.includes(newElective)) {
      handleChange({
        target: {
          name: "selectedProfessional",
          value: [...formData.selectedProfessional, newElective], // ✅ Create a new array instead of mutating
        },
      });
    }
  };

  //? Addition of Open elective
  const handleOpenChange = (event) => {
    const newElective = event.target.value;

    // Ensure we don't add duplicates
    if (!formData.selectedOpen.includes(newElective)) {
      handleChange({
        target: {
          name: "selectedOpen",
          value: [...formData.selectedOpen, newElective], // ✅ Create a new array instead of mutating
        },
      });
    }
  };

  //? Addition of Projects
  const addProject = () => {
    const newProject = [
      ...formData.projects,
      {
        title: "",
        typeP: "",
        mode: "",
        duration: "",
        year: "",
        graded: "",
        supervisor: "",
        coSupervisor: "",
        institute: "",
        sdgConnection: false,
        outcome: "",
        certificate: [],
      },
    ];
    handleChange({ target: { name: "projects", value: newProject } });
  };

  //& Removal functions for removing student details
  //? Removing semester
  const removeSemester = (index) => {
    const modifiedSem = formData.grades.filter((_, i) => i != index);
    handleChange({ target: { name: "grades", value: modifiedSem } });
  };

  //? Removing Professional elective
  const removeProfessional = (elective) => {
    const updatedProfElectives = formData.selectedProfessional.filter(
      (item) => item !== elective
    );
    handleChange({
      target: { name: "selectedProfessional", value: updatedProfElectives },
    });
  };

  //? Removing Open elective
  const removeOpen = (elective) => {
    const updatedOpenElectives = formData.selectedOpen.filter(
      (item) => item !== elective
    );
    handleChange({
      target: { name: "selectedOpen", value: updatedOpenElectives },
    });
  };

  //& Function to handle updates in diffrent acedamic input fields
  //? Update semester details
  const handleGradeChange = (index, field, value) => {
    const updatedGrades = formData.grades.map((grade, i) =>
      i === index ? { ...grade, [field]: value } : grade
    );
    handleChange({ target: { name: "grades", value: updatedGrades } });
  };

  //? handle project entry
  const handleProjectChange = (index, field, value) => {
    console.log("Project Change", index, field, value);
    const updatedProjects = formData.projects.map((project, i) =>
      i === index ? { ...formData.projects[i], [field]: value } : project
    );
    handleChange({
      target: { name: "projects", value: updatedProjects },
    });
  };

  function Upload(index) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.jpg,.png"; // allow only specific types (optional)
    input.onchange = (event) => {
      const file = event.target.files[0];
      setloading(true);
      uploadFileToCloudinary(file).then((url) => {
        formData.grades[index].gradecard = url;
        setloading(false);
        setSnackbarOpen(true); // Show success popup
      });
    };
    input.click();
  }

  function Uploadproj(index) {
    const input = document.createElement("input");
    console.log('hello')
    input.type = "file";
    input.accept = ".pdf,.jpg,.png"; // allow only specific types (optional)
    input.onchange = (event) => {
      const file = event.target.files[0];
         console.log(file);
      setloading(true);
      uploadFileToCloudinary(file).then((url) => {
     
        formData.projects[index].certificate = url;
        setloading(false);
        setSnackbarOpen(true); // Show success popup
      });
    };
    input.click();
  }

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      <Typography
        variant="h4"
        sx={{ mb: isMobile ? 2 : 4, textAlign: isMobile ? "center" : "left" }}
        gutterBottom
      >
        Academic Information
      </Typography>
      <Divider className="mb-4" />

      {/* Semester grades of the student */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Semester-wise Grades
        </Typography>

        <TableContainer component={Paper} className="mb-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Semester</TableCell>
                <TableCell>SGPA</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.grades.map((grade, index) => (
                <TableRow key={index}>
                  {/* Semester Number */}
                  <TableCell>{grade.semester}</TableCell>
                  {/* Semester SGPA */}
                  <TableCell>
                    <TextField
                      fullWidth
                      name="grades"
                      value={grade.sgpa}
                      onChange={(e) =>
                        handleGradeChange(index, "sgpa", e.target.value)
                      }
                      inputProps={{ min: 0, max: 10, step: 0.01 }}
                      sx={{ "& .MuiInputBase-root": { height: 32 } }}
                    />
                  </TableCell>
                  {/* Table icons */}
                  <TableCell sx={{ display: "flex", flexDirection: "row" }}>
                    {!formData.grades[index].gradecard ? (
                      <IconButton onClick={() => Upload(index)}>
                        <CloudUpload />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <CloudDone />
                      </IconButton>
                    )}
                    <IconButton onClick={addSemester}>
                      <Add />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => removeSemester(index)}
                      disabled={formData.grades.length === 1}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ my: 4, bgcolor: "rgba(255, 255, 255, 0.3)" }} />

        {/* Selection form for professional electives */}
        <FormControl
          fullWidth
          variant="outlined"
          sx={{
            mb: 4,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(5px)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 2,
              background: "linear-gradient(to right, #ff512f, #dd2476)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Choose Professional Electives
          </Typography>
          <Select
            onChange={handleProfessionalChange}
            value=""
            sx={{ borderRadius: 2 }}
          >
            {electivesList.map((elective) => (
              <MenuItem key={elective} value={elective}>
                {elective}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Display Selected Professional Electives */}
        {formData.selectedProfessional.length > 0 && (
          <Box sx={{ mb: 4 }}>
            {formData.selectedProfessional.map((elec) => (
              <Chip
                key={elec}
                label={elec}
                sx={{
                  mr: 1,
                  mb: 1,
                  fontSize: "14px",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                  color: "#fff",
                }}
                onDelete={() => removeProfessional(elec)}
                deleteIcon={<Cancel sx={{ color: "#fff" }} />}
              />
            ))}
          </Box>
        )}

        <Divider sx={{ my: 4, bgcolor: "rgba(255, 255, 255, 0.3)" }} />

        {/* Selection form for Open Electives */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            background: "linear-gradient(to right, #ff512f, #dd2476)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Choose Open Electives
        </Typography>
        <FormControl
          fullWidth
          variant="outlined"
          sx={{
            mb: 4,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(5px)",
          }}
        >
          <InputLabel>Select Open Elective</InputLabel>
          <Select onChange={handleOpenChange} value="" sx={{ borderRadius: 2 }}>
            {openElectivesList.map((elective) => (
              <MenuItem key={elective} value={elective}>
                {elective}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Display Selected Open Electives */}
        {formData.selectedOpen.length > 0 && (
          <Box>
            {formData.selectedOpen.map((elec) => (
              <Chip
                key={elec}
                label={elec}
                sx={{
                  mr: 1,
                  mb: 1,
                  fontSize: "14px",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(135deg, #ff9a8b, #ff6a88, #ff99ac)",
                  color: "#fff",
                }}
                onDelete={() => removeOpen(elec)}
                deleteIcon={<Cancel sx={{ color: "#fff" }} />}
              />
            ))}
          </Box>
        )}

        {/* Project info of the user */}
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
        >
          Project Entry
        </Typography>

        {isMobile ? (
          formData.projects.map((value, index) => (
            <Paper
              key={index}
              sx={{ p: 3, mb: 2, borderRadius: 2, boxShadow: 3 }}
            >
              <Typography variant="h6">Project {index + 1}</Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={value.typeP}
                  Change={(e) =>
                    handleProjectChange(index, "type", e.target.value)
                  }
                >
                  <MenuItem value="Major">Major</MenuItem>
                  <MenuItem value="Minor">Minor</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Mode</InputLabel>
                <Select
                  value={value.mode}
                  Change={(e) =>
                    handleProjectChange(index, "mode", e.target.value)
                  }
                >
                  <MenuItem value="Online">Online</MenuItem>
                  <MenuItem value="Offline">Offline</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Duration"
                fullWidth
                sx={{ mb: 2 }}
                value={value.duration}
                onChange={(e) =>
                  handleProjectChange(index, "duration", e.target.value)
                }
              />
              <TextField
                label="Year of Work"
                fullWidth
                sx={{ mb: 2 }}
                value={value.year || ""}
                onChange={(e) =>
                  handleProjectChange(index, "year", e.target.value)
                }
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Graded/Non-Graded</InputLabel>
                <Select
                  value={value.grading || ""} // Default to an empty string if undefined
                  onChange={(e) =>
                    handleProjectChange(index, "grading", e.target.value)
                  }
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Supervisor Name & Institute"
                fullWidth
                sx={{ mb: 2 }}
                value={value.supervisor || ""} // Default to an empty string if undefined
                onChange={(e) =>
                  handleProjectChange(index, "supervisor", e.target.value)
                }
              />
              <TextField
                label="Co-Supervisor Name & Institute"
                fullWidth
                sx={{ mb: 2 }}
                value={value.cosupervisor || ""} // Default to an empty string if undefined
                onChange={(e) =>
                  handleProjectChange(index, "cosupervisor", e.target.value)
                }
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>SDG Connection</InputLabel>
                <Select
                  value={value.sdgConnection || ""} // Default to an empty string if undefined
                  onChange={(e) =>
                    handleProjectChange(index, "sdgConnection", e.target.value)
                  }
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
              {!loading ? (
                <Button
                  variant="contained"
                  component="label"
                  onClick={() => Uploadproj(index)}
                  startIcon={<CloudUpload />}
                  sx={{ backgroundColor: "#388e3c" }}
                >
                  Upload Certificate
                  <input type="file" hidden />
                </Button>
              ) : (
                <Loader />
              )}
            </Paper>
          ))
        ) : (
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 3, boxShadow: 3 }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#635acc" }}>
                <TableRow>
                  {[
                    "Type",
                    "Mode",
                    "Duration",
                    "Year",
                    "Grading",
                    "Supervisor",
                    "Co-Supervisor",
                    "SDG",
                    "Certificate",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.projects.map((value, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <TableCell>
                      <Select
                        fullWidth
                        defaultValue=""
                        value={value.type}
                        onChange={(e) =>
                          handleProjectChange(index, "type", e.target.value)
                        }
                      >
                        <MenuItem value="Major">Major</MenuItem>
                        <MenuItem value="Minor">Minor</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        fullWidth
                        defaultValue=""
                        value={value.mode || ""}
                        onChange={(e) =>
                          handleProjectChange(index, "mode", e.target.value)
                        }
                      >
                        <MenuItem value="Online">Online</MenuItem>
                        <MenuItem value="Offline">Offline</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        type="number"
                        placeholder="Duration (Months)"
                        value={value.duration}
                        onChange={(e) =>
                          handleProjectChange(index, "duration", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        type="number"
                        placeholder="Year"
                        value={value.year}
                        onChange={(e) =>
                          handleProjectChange(index, "year", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        fullWidth
                        defaultValue=""
                        value={value.grading}
                        onChange={(e) =>
                          handleProjectChange(index, "grading", e.target.value)
                        }
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        placeholder="Supervisor Name"
                        value={value.supervisor}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "supervisor",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        placeholder="Co-Supervisor Name"
                        value={value.coSupervisor}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "coSupervisor",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        fullWidth
                        defaultValue=""
                        value={value.sdg}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "sdgConnection",
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="Yes">No</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {!loading ? (
                        <Button
                          variant="contained"
                          component="label"
                          sx={{
                            bgcolor: "#4caf50",
                            color: "white",
                            "&:hover": { bgcolor: "#388e3c" },
                          }}
                           onClick={() => Uploadproj(index)}
                        >
                          <CloudUpload sx={{ mr: 1 }} /> Upload
                         
                        </Button>
                      ) : (
                        <Loader />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button
          variant="contained"
          onClick={addProject}
          sx={{ mt: 2, backgroundColor: "#388e3c" }}
        >
          Add Project
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          File successfully uploaded!
        </Alert>
      </Snackbar>
    </Box>
  );
}
