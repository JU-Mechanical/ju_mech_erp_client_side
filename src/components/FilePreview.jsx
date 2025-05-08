import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const FilePreviewOverlay = ({ file, onClose }) => {
  const [numPages, setNumPages] = useState();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!file) return null;

  const isPDF = file.toLowerCase().endsWith('.pdf');

  const handleDownload = () => {
    // Optional: Implement if download is needed
    // saveAs(file, 'document.pdf');
  };

  return (
    <Box
    onClick={()=>{onClose();console.log("clicked")}}
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      zIndex: 1300,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          gap: '10px',
        }}
      >
   
   <IconButton onClick={()=>{onClose();}} sx={{ color: 'white' }}>
  <CloseIcon />
</IconButton>
      </Box>

      <Box
  onClick={(e) => e.stopPropagation()}
  sx={{
    width: '100%',
    height: '100%',
    overflow: 'auto',
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}
>

        {isPDF ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100%"
            overflow="auto"
            p={2}
            sx={{
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '10px',
                border: '3px solid transparent',
                backgroundClip: 'padding-box',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              transformOrigin: 'center',
            }}
          >
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div>Loading PDF...</div>}
              noData={<div>No PDF file specified</div>}
              error={<div>Error while loading PDF</div>}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Box mb={1} key={index} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Page
                    pageNumber={index + 1}
                    renderMode="canvas"
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={Math.min(window.innerWidth - 13, 600)}
                  />
                </Box>
              ))}
            </Document>
          </Box>
        ) : (
          <Typography variant="body2" color="white">
            Only PDF preview is supported.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FilePreviewOverlay;
