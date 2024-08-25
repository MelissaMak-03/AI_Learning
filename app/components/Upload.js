'use client';

import React, { useState } from 'react';
import { Box, Button, Tab, Tabs, Container, Typography, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

const UploadPage = ({ onFileContentChange }) => {
  const [tabValue, setTabValue] = useState(0);
  const [fileContent, setFileContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const router = useRouter();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
        if (onFileContentChange) onFileContentChange(content); // Send content to chatbot
      };
      reader.readAsText(file);
    }
  };

  const handleUpload = async () => {
    // You can use fileContent here to upload to the backend or pass it to the chatbot page
    if (fileContent) {
      // Pass file content to the chatbot page
      localStorage.setItem('uploadedFileContent', fileContent);
      router.push('/chatbot');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="upload or paste text">
          <Tab label="Paste Text" />
          <Tab label="Upload Document" />
        </Tabs>
      </Box>
      {tabValue === 0 && (
        <Box sx={{ mt: 2, p: 2 }}>
          <TextField
            label="Paste your text here"
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            value={fileContent}
            onChange={(e) => {
              const content = e.target.value;
              setFileContent(content);
              if (onFileContentChange) onFileContentChange(content); // Update chatbot content
            }}
          />
        </Box>
      )}
      {tabValue === 1 && (
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" component="label">
            Select File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {selectedFile && <Typography sx={{ mt: 2 }}>{selectedFile.name}</Typography>}
        </Box>
      )}
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!fileContent}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default UploadPage;
