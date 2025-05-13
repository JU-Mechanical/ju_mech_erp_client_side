import { Button, Container, Divider, Paper, TextField, Typography, useMediaQuery } from '@mui/material';
import { motion,AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import JULogo from "../assets/julogo.png";
const PromptForKey = () => {
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctKey = import.meta.env.VITE_ADMIN_ACCESS_KEY;
  
    if (inputKey === correctKey) {
      localStorage.setItem('adminKey', inputKey);
    window.location.reload(); // triggers route to Admin
    } else {
      setError('Invalid Key');
    }
  };

   const isMobile = useMediaQuery("(max-width:600px)");
  const PRIMARY_COLOR = "#b70924";
const WHITE = "#ffffff";

  return (
    // <div style={{ padding: 40 }}>
    //   <h2>Enter Admin Access Key</h2>
    //   <input
    //     type="password"
     
    //   />
    //   <button onClick={handleSubmit}>Submit</button>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    // </div>
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
      {/* Background Image with Blur */}
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
          filter: "blur(8px)", // Blur effect for the background
          zIndex: 1,
        }}
      ></div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
        style={{
          height: isMobile ? "80%" : "20%",
          overflowY: "auto",
          position: "relative",
          zIndex: 2, // Ensure the form is above the blurred background
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={"login" }
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={10}
              sx={{
                padding: isMobile ? 3 : 4,
                borderRadius: 4,
                textAlign: "center",
                bgcolor: "rgba(255, 255, 255, 0.9)", // Slightly transparent background
                boxShadow: "0px 4px 30px rgba(255, 255, 255, 0.5)", // Glowing effect
                backdropFilter: "blur(10px)", // Add blur effect to the box
                width: isMobile ? "90vw" : "400px",
                overflowY: "auto",
                maxHeight: "90vh",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 8px 40px rgba(255, 255, 255, 0.8)", // Enhance glow on hover
                },
              }}
            >
              <img
                src={JULogo}
                style={{
                  width: !isMobile ? 300 : 200,
                  height: !isMobile ? 60 : 40,
                }}
              />
             

              <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
            
                  <>
                    <TextField
                     
                      variant="outlined"
                      fullWidth
                      
                      type="password"
                        label="Access Key"
     value={inputKey}
     onChange={(e) => setInputKey(e.target.value)}
                     
                      margin="dense"
                      sx={{
                        bgcolor: "#f9f9f9",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-root": { borderRadius: 2 },
                      }}
                    />
                   
                  </>
              

               

                <motion.div
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      bgcolor: PRIMARY_COLOR,
                      color: WHITE,
                      fontWeight: "bold",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      padding: isMobile ? "10px" : "12px",
                      borderRadius: 3,
                    }}
                  >
                    Login
                  </Button>
                </motion.div>
              </form>

           

              <motion.div
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.3)",
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                {/* <Button
                  fullWidth
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: isMobile ? "10px" : "12px",
                    fontWeight: "bold",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    color: "#000",
                    bgcolor: "#fff",
                    border: "2px solid #ddd",
                    borderRadius: 3,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      borderColor: PRIMARY_COLOR,
                      color: PRIMARY_COLOR,
                    },
                  }}
                  onClick={handleGoogleSignIn}
                >
                  <GoogleIcon sx={{ fontSize: isMobile ? "22px" : "24px" }} />
                  {isLogin ? "Login with Google" : "Sign Up with Google"}
                </Button> */}
              </motion.div>

             
            </Paper>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </Container>
  );
};

export default PromptForKey;
