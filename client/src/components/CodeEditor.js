import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';
import ReactEditor from './ReactEditor';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [savedCodes, setSavedCodes] = useState([]);

  // Load saved code snippets when the component mounts
  useEffect(() => {
    loadSavedCodes();
  }, []);

  const loadSavedCodes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/load-code', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSavedCodes(response.data);
    } catch (error) {
      console.error('Error loading saved codes:', error.response ? error.response.data : error.message);
    }
  };

  const executeCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/execute', {
        code,
        language,
      });
      console.log(response.data);
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error executing code:', error.response ? error.response.data : error.message);
      setOutput('Error executing code');
    }
  };

  const saveCode = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.post('http://localhost:5000/api/users/save-code', {
        title: `My ${language} code`,
        code,
        language,
      }, {
        headers: { Authorization: `Bearer ${token}` }, // Include the token in headers
      });

      console.log(response.data); // Log success message from the server
      setOutput('Code saved successfully!');
      loadSavedCodes(); // Reload saved codes after saving
    } catch (error) {
      console.error('Error saving code:', error.response ? error.response.data : error.message);
      setOutput('Error saving code');
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
    <div>
      <select onChange={handleLanguageChange} value={language}>
        <option value="javascript">JavaScript</option>
        <option value="java">Java</option>
        <option value="c">C</option>
        <option value="react">React</option>
      </select>

      {language === 'react' ? (
        <ReactEditor />
      ) : (
        <div>
          <MonacoEditor
            height="400px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
          />
          <button onClick={executeCode}>Run</button>
          <button onClick={saveCode}>Save</button>
          <h1>{output}</h1>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
