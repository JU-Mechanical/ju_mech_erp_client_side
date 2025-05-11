import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Delete, ExpandMore } from "@mui/icons-material";
import { CloudUpload, Cancel, CloudDone } from "@mui/icons-material";
import { uploadFileToCloudinary } from "../helpers/uploadfiles";
import Loader from "../components/Loading";

export default function CoCurricularForm({ formData, handleChange }) {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setloading] = useState({
    clubs: false,
    techFests: false,
    leadership: false,
    sports: false,
    skills: false,
    socialActivities: false,
    seminars: false,
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const defaultRows = {
    clubs: {
      name: "",
      role: "",
      accolades: "",
      achievements: "",
      certificate: null,
    },
    techFests: {
      name: "",
      organizer: "",
      eventType: "",
      year: "",
      role: "",
      teammates: "",
      outcome: "",
      certificate: null,
    },
    leadership: { role: "", details: "", certificate: null },
    sports: {
      name: "",
      level: "",
      venue: "",
      year: "",
      result: "",
      accolades: "",
      certificate: null,
    },
    skills: {
      name: "",
      offeredby: "",
      mode: "",
      duration: "",
      fee: "",
      certificate: null,
    },
    socialActivities: {
      name: "",
      details: "",
      date: "",
      location: "",
      certificate: null,
    },
    seminars: {
      name: "",
      venue: "",
      date: "",
      organizer: "",
      certificate: null,
    },
  };

  const handleAddRow = (section) => {
    const updatedSection = [...(formData[section] || []), defaultRows[section]];
    handleChange({ target: { name: section, value: updatedSection } });
  };

  const handleChangeRow = (index, field, value, section) => {
    const updatedSection = formData[section].map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    handleChange({ target: { name: section, value: updatedSection } });
  };

  const handleRemoveRow = (index, section) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    handleChange({ target: { name: section, value: updatedSection } });
  };

  const handleUpload = (index, type) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.jpg,.png";
    input.onchange = (event) => {
      const file = event.target.files[0];
      setloading((prev) => ({ ...prev, [type]: true })); // Set loading for the specific type
      uploadFileToCloudinary(file)
        .then((url) => {
          const updatedSection = formData[type].map((row, i) =>
            i === index ? { ...row, certificate: url } : row
          );
          handleChange({ target: { name: type, value: updatedSection } });
          setSnackbarOpen(true);
        })
        .catch((error) => {
          console.error("File upload failed:", error);
        })
        .finally(() => {
          setloading((prev) => ({ ...prev, [type]: false })); // Reset loading for the specific type
        });
    };
    input.click();
  };

  return (
    <Box
      sx={{
        padding: isMobile ? "10px" : "20px",
        width: "100%",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: isMobile ? 2 : 4, textAlign: isMobile ? "center" : "left" }}
      >
        Co-Curricular Activities
      </Typography>

      {Object.keys(defaultRows).map((section) => (
        <FormControlLabel
          key={section}
          control={
            <Checkbox
              checked={formData[section]?.length > 0}
              onChange={() =>
                handleChange({
                  target: {
                    name: section,
                    value:
                      formData[section]?.length > 0
                        ? []
                        : [defaultRows[section]],
                  },
                })
              }
            />
          }
          label={section
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        />
      ))}

      {Object.keys(defaultRows).map((section) =>
        formData[section]?.length > 0 ? (
          <Section
            key={section}
            title={section
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            rows={formData[section]}
            section={section}
            fields={Object.keys(defaultRows[section])
              .filter((key) => key !== "certificate")
              .map((key) => ({
                label: key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase()),
                key,
              }))}
            isMobile={isMobile}
            handleAddRow={handleAddRow}
            handleChangeRow={handleChangeRow}
            handleRemoveRow={handleRemoveRow}
            handleUpload={handleUpload}
            loading={loading}
          />
        ) : null
      )}

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

function Section({
  title,
  rows,
  section,
  fields,
  isMobile,
  handleAddRow,
  handleChangeRow,
  handleRemoveRow,
  handleUpload,
  loading,
}) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">{title}</Typography>
      {isMobile ? (
        rows.map((row, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>{row.name || `Entry ${index + 1}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {fields.map((field) => (
                  <TextField
                    key={field.key}
                    label={field.label}
                    fullWidth
                    value={row[field.key] || ""}
                    onChange={(e) =>
                      handleChangeRow(index, field.key, e.target.value, section)
                    }
                  />
                ))}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton onClick={() => handleUpload(index, section)}>
                    {loading[section] ? (
                      <Loader size={24} /> // Show loader when uploading
                    ) : row.certificate ? (
                      <CloudDone />
                    ) : (
                      <CloudUpload />
                    )}
                  </IconButton>
                  <IconButton onClick={() => handleRemoveRow(index, section)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <TableCell key={field.key}>{field.label}</TableCell>
                ))}
                <TableCell>Certificate</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {fields.map((field) => (
                    <TableCell key={field.key}>
                      <TextField
                        fullWidth
                        value={row[field.key] || ""}
                        onChange={(e) =>
                          handleChangeRow(
                            index,
                            field.key,
                            e.target.value,
                            section
                          )
                        }
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton onClick={() => handleUpload(index, section)}>
                      {loading[section] ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 32, // Match the height of other elements
                            width: 32, // Optional: Keep it consistent
                          }}
                        >
                          <Loader size={24} color={"primary"} />{" "}
                        </Box> // Show loader when uploading
                      ) : row.certificate ? (
                        <CloudDone />
                      ) : (
                        <CloudUpload />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveRow(index, section)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button
        startIcon={<Add />}
        onClick={() => handleAddRow(section)}
        sx={{ mt: 2 }}
      >
        Add Entry
      </Button>
    </Box>
  );
}
