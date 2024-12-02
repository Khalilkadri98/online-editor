import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';
import ReactEditor from '../ReactEditor';
import { Box, Button, Select, MenuItem, Typography, Grid, CircularProgress } from '@mui/material';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [savedCodes, setSavedCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load saved code snippets when the component mounts
  useEffect(() => {
    loadSavedCodes();
  }, []);

  const loadSavedCodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/users/load-code', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSavedCodes(response.data);
    } catch (error) {
      console.error('Error loading saved codes:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const executeCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/execute', {
        code,
        language,
      });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error executing code:', error.response ? error.response.data : error.message);
      setOutput('Error executing code');
    } finally {
      setLoading(false);
    }
  };

  const saveCode = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/users/save-code', {
        title: `My ${language} code`,
        code,
        language,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data);
      setOutput('Code saved successfully!');
      loadSavedCodes(); // Reload saved codes after saving
    } catch (error) {
      console.error('Error saving code:', error.response ? error.response.data : error.message);
      setOutput('Error saving code');
    } finally {
      setLoading(false);
    }
  };

  const loadCode = (codeSnippet) => {
    setCode(codeSnippet.code);
    setLanguage(codeSnippet.language);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setOutput(''); // Reset output when language changes

    // Automatically load the first code snippet of the selected language
    const matchedCode = savedCodes.find(codeSnippet => codeSnippet.language === selectedLanguage);
    if (matchedCode) {
      loadCode(matchedCode);
    } else {
      setCode(''); // Clear the editor if no match is found
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Select Programming Language:</Typography>
          <Select
            fullWidth
            value={language}
            onChange={handleLanguageChange}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="c">C</MenuItem>
            <MenuItem value="react">React</MenuItem>
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="php">PHP</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} md={8}>
          {language === 'react' ? (
            <ReactEditor />
          ) : (
            <Box>
              <MonacoEditor
                height="400px"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value)}
                options={{ automaticLayout: true }}
              />
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={executeCode}
              sx={{ marginRight: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Run'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={saveCode}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Output:</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {output || (loading ? 'Loading...' : '')}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CodeEditor;
