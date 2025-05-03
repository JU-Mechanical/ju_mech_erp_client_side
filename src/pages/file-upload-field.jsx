"use client"

import React, { useState, useRef } from "react"
import { Box, Button, Typography, List, ListItem, ListItemText, ListItemIcon, IconButton } from "@mui/material"
import { Upload, FileText, X } from "lucide-react"

export default function FileUploadField({ label, onChange, multiple = false }) {
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)

      if (multiple) {
        setFiles([...files, ...newFiles])
        onChange([...files, ...newFiles])
      } else {
        setFiles(newFiles)
        onChange(newFiles)
      }
    }
  }

  const handleRemoveFile = (index) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    onChange(newFiles)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Box className="border-2 border-dashed border-gray-300 rounded-md p-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        multiple={multiple}
      />

      <Box className="text-center mb-4">
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>

        <Button variant="outlined" startIcon={<Upload />} onClick={handleButtonClick}>
          Choose File{multiple ? "s" : ""}
        </Button>
      </Box>

      {files.length > 0 && (
        <List>
          {files.map((file, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                  <X size={18} />
                </IconButton>
              }
            >
              <ListItemIcon>
                <FileText size={24} />
              </ListItemIcon>
              <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(2)} KB`} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}

