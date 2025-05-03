import React from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function ContactUs() {
  return (
    <Box sx={{ mt: 6, textAlign: "center", padding: "20px", backgroundColor: "#b70924", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", color: "#fff" }}>
      <Typography variant="h3" component="h2" gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={4} sx={{ borderRight: "1px solid rgba(255, 255, 255, 0.7)" }}>
          <Box sx={{ textAlign: "centre", padding: "20px" }}>
            <Typography variant="h5" component="h3" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body1" component="p" gutterBottom sx={{ fontStyle: "italic" }}>
              <b>Email:</b> support@jumperp.com
            </Typography>
            <Typography variant="body1" component="p" gutterBottom sx={{ fontStyle: "italic" }}>
              <b>Email:</b> support@jumperp.com
            </Typography>
            <Typography variant="body1" component="p" gutterBottom sx={{ fontStyle: "italic" }}>
              <b>Phone:</b> +1-800-123-4567
            </Typography>
            <Typography variant="body1" component="p" gutterBottom sx={{ fontStyle: "italic" }}>
              <b>Phone:</b> +1-800-123-4567
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ borderRight: "1px solid rgba(255, 255, 255, 0.7)" }}>
          <Box sx={{ textAlign: "center", padding: "20px" }}>
            <Typography variant="h5" component="h3" gutterBottom>
              Address
            </Typography>
            <Typography variant="body1" component="p" gutterBottom sx={{ fontStyle: "italic" }}>
              <b>Department of Mechanical Engineering</b>
            </Typography>
            <Typography variant="body1" component="p" gutterBottom sx={{ fontStyle: "italic" }}>
              Jadavpur University
            </Typography>
            <Typography variant="body1" component="p" gutterBottom sx={{ fontStyle: "italic" }}>
              188, Raja S.C. Mallick Rd
            </Typography>
            <Typography variant="body1" component="p" gutterBottom sx={{ fontStyle: "italic" }}>
              Kolkata, West Bengal - 700032
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box component="form" sx={{ backgroundColor: "rgba(255, 255, 255, 0)", padding: "20px", borderRadius: "8px" }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="dense"
              InputProps={{
                style: {
                  borderColor: "rgba(255, 255, 255, 0.7)",
                  color: "#fff",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "#fff",
                },
              }}
            />
            <TextField
              fullWidth
              label="User Email"
              variant="outlined"
              margin="dense"
              InputProps={{
                style: {
                  borderColor: "rgba(255, 255, 255, 0.7)",
                  color: "#fff",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "#fff",
                },
              }}
            />
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              margin="dense"
              multiline
              rows={4}
              InputProps={{
                style: {
                  borderColor: "rgba(255, 255, 255, 0.7)",
                  color: "#fff",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "#fff",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                transition: "transform 100ms",
                "&:hover": {
                  transform: "scale(1.11)",
                },
                "&:active": {
                  transform: "scale(0.99)",
                },
              }}
            >
              Send Message
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ mt: 6, textAlign: "center", padding: "0", backgroundColor: "auto", color: "#fff" }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="body2" component="p">
              &copy; {new Date().getFullYear()} JUMERP. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" component="p">
              Management Contact: +1-800-123-4567
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" component="p">
              <Link to="/privacy-policy" style={{ color: "#fff", textDecoration: "none" }}>
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link to="/terms-and-conditions" style={{ color: "#fff", textDecoration: "none" }}>
                Terms and Conditions
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}