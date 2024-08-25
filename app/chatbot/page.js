'use client'

import React, { useState } from 'react';
import { TextField, Button, Typography, Box, List, ListItem, Grid, Container } from '@mui/material';

const Chatbot = () => {
    const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);


  const [fileContent, setFileContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result.trim();
        setFileContent(content);
      };
      reader.readAsText(file);
    }
  };

  const handleUpload = async () => {
    
    }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure the question is not empty
    // if (!question.trim()) return;
    if (!question.trim() || !fileContent.trim()) {
        alert('Please enter a question and ensure a file is uploaded.');
        return;
      }

    // Add user question to chat history
    setChatHistory((prev) => [...prev, { sender: 'user', message: question }]);

    try {
      // Send a POST request to the backend API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question.trim(), fileContent }),
      });

      const data = await response.json();
    //   console.log(data)
      // Add AI response to chat history
      setChatHistory((prev) => [...prev, { sender: 'ai', message: data.answer }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setChatHistory((prev) => [...prev, { sender: 'ai', message: 'Error fetching response from server.' }]);
    } finally {
      // Clear the input field
      setQuestion('');
    }
  };
   //*************************************** */
  //Upload file
  //************************************* */






  return (
    
    <Container maxWidth="lg" sx={{ mt: 12 }}>
    <Box sx = {{ textAlign: "center", mb: 4}}>
        <Typography variant='h4'>
            Chat with your document
        </Typography>
    </Box>
      <Grid container spacing={4}>
        {/* Upload Container - takes 1/4 of the width */}
        <Grid item xs={12} md={3}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upload Document
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" component="label">
              Select File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {selectedFile && <Typography sx={{ mt: 2 }}>{selectedFile.name}</Typography>}
          </Box>
          {/* <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!fileContent}
            >
              Submit
            </Button>
          </Box> */}
        </Grid>

        {/* Chatbot Container - takes 3/4 of the width */}
        <Grid item xs={12} md={9}>
          <Box>
            <List>
              {chatHistory.map((entry, index) => (
                <ListItem key={index} sx={{ display: 'flex', justifyContent: entry.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <Typography
                    variant="body1"
                    sx={{
                      backgroundColor: entry.sender === 'user' ? '#e0e0e0' : '#1976d2',
                      color: entry.sender === 'user' ? '#000' : '#fff',
                      borderRadius: 2,
                      p: 1,
                      maxWidth: '60%',
                    }}
                  >
                    {entry.message}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Ask a question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Send
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
  
  export default Chatbot;