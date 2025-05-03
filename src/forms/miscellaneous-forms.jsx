import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Add,
  Delete,
  CloudUpload,
  Cancel,
  CloudDone,
} from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MiscellaneousForm({ formData, handleChange }) {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Function to handle file uploads using handleChange
  function Upload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.jpg,.png"; // allow only specific types (optional)
    input.onchange = (event) => {
      const file = event.target.files[0];
      uploadFileToCloudinary(file).then((url) => {
        formData.lor = url;
        setSnackbarOpen(true); // Show success popup
        console.log(url);
      });
    };
    input.click();
  }

  // Function to export data as an array
  const exportDataAsArray = () => {
    const dataArray = [
      formData.lor,
      formData.keyLearnings,
      formData.sop,
      formData.vision,
    ];
    console.log(dataArray);
  };

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        color: "#fff",
        borderRadius: "12px",
        padding: isMobile ? "20px" : "40px",
      }}
    >
      {/* LOR Upload */}
      <Box
        sx={{
          width: "100%",
          mb: 3,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: isMobile ? "flex-start" : "space-between",
          gap: isMobile ? "10px" : "0",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: isMobile ? 2 : 4,
            textAlign: isMobile ? "center" : "left",
            color: "black",
          }}
        >
          Letter of Recommendation (LOR)
        </Typography>
        <Button
          variant="contained"
          component="label"
          sx={{
            borderRadius: "10px",
            background: "#b70924",
            width: isMobile ? "100%" : "40%",
          }}
          onClick={() => {
            Upload();
          }}
        >
          {!formData.lor ? (
            <IconButton>
              <CloudUpload />
            </IconButton>
          ) : (
            <IconButton>
              <CloudDone />
            </IconButton>
          )}
        </Button>
      </Box>

      {/* Key Learnings */}
      <TextField
        label="Key Learnings / Highlights of the Programme"
        variant="outlined"
        multiline
        rows={isMobile ? 4 : 3}
        fullWidth
        sx={{
          mb: 3,
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.1)",
        }}
        value={formData.keyLearnings}
        onChange={(e) =>
          handleChange({
            target: { name: "keyLearnings", value: e.target.value },
          })
        }
      />

      {/* SOP */}
      <TextField
        label="Statement of Purpose (SOP)"
        variant="outlined"
        multiline
        rows={isMobile ? 4 : 3}
        fullWidth
        sx={{
          mb: 3,
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.1)",
        }}
        value={formData.sop}
        onChange={(e) =>
          handleChange({ target: { name: "sop", value: e.target.value } })
        }
      />

      {/* Vision & Long-term Aspirations */}
      <TextField
        label="Vision & Long-Term Aspirations"
        variant="outlined"
        multiline
        rows={isMobile ? 4 : 3}
        fullWidth
        sx={{
          mb: 3,
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.1)",
        }}
        value={formData.vision}
        onChange={(e) =>
          handleChange({ target: { name: "vision", value: e.target.value } })
        }
      />

      {/* Export Data Button */}
      <Button
        variant="contained"
        sx={{
          mt: 2,
          borderRadius: "10px",
          background: "#007BFF",
          "&:hover": { background: "#0056b3" },
          width: isMobile ? "100%" : "auto",
        }}
        onClick={exportDataAsArray}
      >
        Export Data
      </Button>

      {/* Snackbar for success popup */}
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
    </Container>
  );
}
