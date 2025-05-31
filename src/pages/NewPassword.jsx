import {
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetNewPassword = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const PRIMARY_COLOR = "#b70924";
  const WHITE = "#ffffff";
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { token } = useParams();
  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log(newPassword);
    setLoading(true);
    try {
         
         //console.log(token);
         const response=await fetch(`https://jumechserver.onrender.com/users/resetpassword/${token}`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({newPassword:newPassword})
         });
         const data=await response.json();
         console.log(data);
         if(response.ok){
            navigate("/");
         }
    } catch (error) {
        console.log(error);
    }
    setLoading(false);
    setSubmitted(true);

  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        position: "relative",
        overflow: "hidden",
      }}
      maxWidth={false}
    >
      {/* Background Blur */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(https://res.cloudinary.com/dig63yzxi/image/upload/v1740909479/L_v8wbsy.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px)",
          zIndex: 1,
        }}
      ></div>

      {/* Foreground Form */}
      <Paper
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        elevation={10}
        sx={{
          padding: isMobile ? 3 : 6,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.9)",
          zIndex: 2,
          width: isMobile ? "100%" : "400px",
        }}
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="reset"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h5"
                fontWeight={600}
                color={PRIMARY_COLOR}
                textAlign="center"
                mb={3}
              >
                Set New Password
              </Typography>

              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSubmit}
                disabled={!newPassword || !confirmPassword || loading}
                sx={{
                  backgroundColor: PRIMARY_COLOR,
                  color: WHITE,
                  "&:hover": { backgroundColor: "#94081d" },
                  height: "48px",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: WHITE }} />
                ) : (
                  "Done"
                )}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: "center" }}
            >
              <Typography variant="h6" color={PRIMARY_COLOR} gutterBottom>
                Password Reset!
              </Typography>
              <Typography variant="body1">
                Redirecting to login...
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </Container>
  );
};

export default ResetNewPassword;
