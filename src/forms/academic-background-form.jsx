"use client";

import { useState } from "react";
import { 
  TextField, 
  Grid, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Divider,
  Box
} from "@mui/material";

export default function AcademicBackgroundForm({ onChange, formData, handleChange }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Academic Background
      </Typography>
      <Divider className="mb-4" />
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Secondary Education (10th Standard)
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Marks (%)"
            name="secondaryMarks"
            type="number"
            inputProps={{ min: 0, max: 100, step: 0.01 }}
            value={formData.secondaryMarks}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Year"
            name="secondaryYear"
            type="number"
            value={formData.secondaryYear}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Higher Secondary Education (+2 Standard)
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Marks (%)"
            name="higherSecondaryMarks"
            type="number"
            inputProps={{ min: 0, max: 100, step: 0.01 }}
            value={formData.higherSecondaryMarks}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Year"
            name="higherSecondaryYear"
            type="number"
            value={formData.higherSecondaryYear}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Medium of Education at +2 Standard</InputLabel>
            <Select
              name="mediumOfEducation"
              value={formData.mediumOfEducation}
              onChange={handleChange}
              label="Medium of Education at +2 Standard"
            >
              <MenuItem value="motherTongue">Mother Tongue</MenuItem>
              <MenuItem value="english">English</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Entrance Examination
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Entrance Exam Name"
            name="entranceExamName"
            value={formData.entranceExamName}
            onChange={handleChange}
            placeholder="WBJEE/JEE/etc."
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Rank"
            name="entranceExamRank"
            value={formData.entranceExamRank}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Year"
            name="entranceExamYear"
            type="number"
            value={formData.entranceExamYear}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
