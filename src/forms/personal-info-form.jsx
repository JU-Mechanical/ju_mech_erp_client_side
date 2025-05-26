"use client";
import { 
  TextField, 
  Grid, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Checkbox,
  Box
} from "@mui/material";
import { motion } from "framer-motion";
const FloatingLabelTextField = ({ label, name, type = "text", value, onChange, required, multiline, rows }) => (
  <Box sx={{ position: "relative", width: "100%", mb: 3 }}>
    <Typography
      sx={{
        position: "absolute",
        top: value ? -12 : "50%",
        left: "12px",
        transform: value ? "translateY(0) scale(0.85)" : "translateY(-50%)",
        transformOrigin: "left",
        fontSize: "16px",
        fontWeight: 600,
        color: value ? "#635acc" : "#888",
        transition: "all 0.3s ease",
        pointerEvents: "none",
        background: "white",
        px: 1,
        borderRadius: "4px",
      }}
    >
      {label}
    </Typography>
    <motion.input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      style={{
        width: "100%",
        padding: multiline ? "20px 12px 10px" : "16px 12px 8px",
        fontSize: "16px",
        fontWeight: 500,
        background: "rgba(255, 255, 255, 0.2)",
        border: "2px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        color: "#222",
        transition: "all 0.3s ease",
      }}
      whileFocus={{
        border: "2px solid #635acc",
        boxShadow: "0px 4px 8px rgba(99, 90, 204, 0.3)",
      }}
    />
  </Box>
);

export default function PersonalInfoForm({ formData, handleChange }) {
  console.log(formData.dob);
  return (
    <Box sx={{ }}>
      <Typography variant="h4" sx={{mb:5}} gutterBottom>
        Personal Information
      </Typography>
 
      {/* Input field to take student name as entry */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Input field to tale DOB of the student */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Date of Birth"
            name="dob"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dob}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Dropdown menu to select gender */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth required>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* Dropdown menu to select category */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="sc">SC</MenuItem>
              <MenuItem value="st">ST</MenuItem>
              <MenuItem value="obc">OBC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* To check PWD */}
        <Grid item xs={12} md={4}>
          <FormControlLabel
            control={
              <Checkbox
                name="isPwd"
                checked={formData.isPwd}
                onChange={handleChange}
              />
            }
            label="Differently-Abled/PWD"
          />
        </Grid>
        
        {/* Form portion to take contact detials */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Contact Details
          </Typography>
        </Grid>
        
        {/* Taking Student Mobile number */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Mobile Number"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Taking WhatsApp number */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="WhatsApp Number"
            name="whatsappNo"
            value={formData.whatsappNo}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Taking email of the student */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Taking alternate email of the student */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Alternate Email"
            name="alternateEmail"
            type="email"
            value={formData.alternateEmail}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Taking present location details of the student */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Present Address
          </Typography>
        </Grid>
        
        {/* Taking present address details of the student */}
        <Grid item xs={12} md={8}>
          <TextField
            required
            fullWidth
            label="Present Address"
            name="presentAddress"
            multiline
            rows={3}
            value={formData.presentAddress}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Taking present state detials of the student */}
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="State"
            name="presentState"
            value={formData.presentState}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Taking permanent location details of the student */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Permanent Address
          </Typography>
        </Grid>
        
        {/* Taking permanent address details of the student */}
        <Grid item xs={12} md={8}>
          <TextField
            required
            fullWidth
            label="Permanent Address"
            name="permanentAddress"
            multiline
            rows={3}
            value={formData.permanentAddress}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Taking present state details of the student */}
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="State"
            name="permanentState"
            value={formData.permanentState}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Taking eergency contact details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Emergency Contact
          </Typography>
        </Grid>
        
        {/* Taking emergency contact name */}
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Name"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Taking emergency contact number */}
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Contact Number"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Taking emergency contact relation */}
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Relation"
            name="emergencyContactRelation"
            value={formData.emergencyContactRelation}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Taking nationality & indentification details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Nationality and Identification
          </Typography>
        </Grid>
        
        {/* Nationality of the student */}
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Id type of the student for verification */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth required>
            <InputLabel>ID Type</InputLabel>
            <Select
              name="idType"
              value={formData.idType}
              onChange={handleChange}
              label="ID Type"
            >
              <MenuItem value="aadhaar">Aadhaar</MenuItem>
              <MenuItem value="passport">Passport</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* id number of the student */}
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="ID Number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
          />
        </Grid>
        
        {/* Family income of the student */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Family Income (LPA)"
            name="familyIncome"
            type="number"
            value={formData.familyIncome}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
