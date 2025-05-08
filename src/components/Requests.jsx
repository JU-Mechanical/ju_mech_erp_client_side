import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  Collapse,
  Modal,
  Divider,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import Empty from "../assets/empty.png";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
const Requests = () => {
  const user = useSelector((state) => state.user);
  const isMobile = useMediaQuery("(max-width:900px)");
  const [isOpen, setIsOpen] = useState(false); // Controls form visibility
  const [formData, setFormData] = useState({
    user_id: user._id,
    fullName: user.name,
    requestDetails: "",
    shortWriteup: "",
  });
  const [requests, setrequests] = useState([]);
  const [closedrequests, setclosedrequests] = useState([]);
  useEffect(() => {
    const getreqs = async () => {
      const data = { user_id: user._id };
      console.log(data);
      const response = await fetch("http://localhost:5000/users/getreqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response);
      const returneddata = await response.json();
      console.log(returneddata);
      setrequests(returneddata);
    };
    getreqs();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/users/createreq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      const newreqs = [requests, data];
      setrequests(newreqs);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "white",
        borderRadius: 10,
        p: 5,
      }}
    >
      <Typography
        sx={{ fontWeight: "bold", color: "#b70924", fontSize: "40px" }}
      >
        Requests
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          mb: 1,
          mt: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "26px",
            whiteSpace: "nowrap", // Prevents text from wrapping
            color: "#b70924",
          }}
        >
          My Requests
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            alignItems: "center",
          }}
        >
          <motion.div
            whileTap={{ scale: 0.9 }} // Click animation (press down effect)
            transition={{ type: "spring", stiffness: 300, damping: 10 }} // Smooth animation
            onClick={() => setIsOpen(!isOpen)}
            style={{
              backgroundColor: "#b70924",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "inline-block",
              textAlign: "center",
              userSelect: "none",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow
            }}
          >
            Make a Request
          </motion.div>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          mt: 3,
        }}
      >
        {requests.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5", // Slightly off-white background
              borderRadius: 5,
              p: 3,
            }}
          >
            <img
              src={Empty}
              style={{ width: 100, height: 100, marginBottom: 10 }}
            />
            <Typography
              sx={{ color: "#757575", fontSize: "18px", fontWeight: "bold" }}
            >
              You haven’t made any requests yet.
            </Typography>
          </Box>
        )}

        {requests.length > 0 &&
          requests.map((request, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "#f8f9fa", // Light grey background
                borderRadius: "12px", // Curved corners
                padding: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
                borderLeft: "5px solid #b70924", // Bold left border for style
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
                display: "flex",
                justifyContent: "space-between", // Space between text and date
                alignItems: "center",
              }}
            >
              {/* Request Details */}
              <span>{request.requestDetails}</span>

              {/* Time Ago */}
              <Typography sx={{ fontSize: "14px", color: "#777" }}>
                {formatDistanceToNow(new Date(request.createdAt), {
                  addSuffix: true,
                })}
              </Typography>
            </Box>
          ))}
      </Box>

      {/* Collapsible Form */}
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="request-modal"
      >
        <Box
          sx={{
            position: "absolute", // Fix modal position
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            maxWidth: "900px",
            minWidth: isMobile ? "90%" : "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: 40,
              border: "2px solid #b70924", // Matching border color
              borderRadius: "10px", // Rounded edges
              padding: "20px", // Inner spacing
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Light shadow for depth
              backgroundColor: "white", // Clean background
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#b70924" }}
            >
              Fill out the Form
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputProps={{ readOnly: true }}
            />

            <TextField
              fullWidth
              label="What are you requesting?"
              name="requestDetails"
              value={formData.requestDetails}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={3}
            />

            <TextField
              fullWidth
              label="Short Writeup"
              name="shortWriteup"
              value={formData.shortWriteup}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={5}
              InputProps={{
                style: { verticalAlign: "top" },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                marginTop: 2,
                backgroundColor: "#b70924",
                "&:hover": { backgroundColor: "#96071e" },
              }}
            >
              Submit Request
            </Button>
          </form>
        </Box>
      </Modal>

      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          mt: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "26px",
            whiteSpace: "nowrap", // Prevents text from wrapping
            color: "#b70924",
          }}
        >
          Closed Requests
        </Typography>
        {closedrequests.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5", // Slightly off-white background
              borderRadius: 5,
              p: 3,
            }}
          >
            <img
              src={Empty}
              style={{ width: 100, height: 100, marginBottom: 10 }}
            />
            <Typography
              sx={{ color: "#757575", fontSize: "18px", fontWeight: "bold" }}
            >
              You don't have any closed requests yet.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Requests;
