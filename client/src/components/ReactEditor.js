import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Sidebar from './Sidebar';
import axios from 'axios';

const initialFiles = {
    'App.js': `const App = () => {
        return (
            <div>
                <h1>Hello, World!</h1>
                <p>This is a simple React component.</p>
            </div>
        );
    };`,
    'index.js': `import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    
    ReactDOM.render(<App />, document.getElementById('root'));`,
    'package.json': `{
        "name": "my-app",
        "version": "1.0.0",
        "main": "index.js",
        "dependencies": {
            "react": "^17.0.2",
            "react-dom": "^17.0.2"
        }
    }`,
    'styles.css': ``
};

const ReactEditor = () => {
    const [files, setFiles] = useState(initialFiles);
    const [currentFile, setCurrentFile] = useState('App.js');
    const [code, setCode] = useState(initialFiles['App.js']);
    const [output, setOutput] = useState('');

    useEffect(() => {
        fetchSavedFiles();
    }, []);

    useEffect(() => {
        setCode(files[currentFile] || '');  // Handle case when currentFile might not exist
    }, [currentFile, files]);

    useEffect(() => {
        setFiles((prevFiles) => ({ ...prevFiles, [currentFile]: code }));
        setOutput(code);
    }, [code]);

    const fetchSavedFiles = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('http://localhost:5000/api/react/files', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const savedFiles = response.data.files.reduce((acc, file) => {
                acc[file.filename] = file.content;
                return acc;
            }, {});

            setFiles(savedFiles);
            setCurrentFile(Object.keys(savedFiles)[0] || 'App.js');
        } catch (error) {
            console.error('Error fetching saved files:', error.response ? error.response.data : error.message);
        }
    };


    const iframeContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Output</title>
        <style>${files['styles.css']}</style>
        <script src="https://unpkg.com/react/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    </head>
    <body>
        <div id="root"></div>
        <script type="text/babel">
            try {
                ${output}
                const rootElement = document.getElementById('root');
                ReactDOM.render(React.createElement(App), rootElement);
            } catch (error) {
                document.getElementById('root').innerHTML = '<pre style="color: red;">' + error.message + '</pre>';
            }
        </script>
    </body>
    </html>`;

    const handleSave = async () => {
        const token = localStorage.getItem('token');
      
        if (!token) {
          console.error('No token found, please log in.');
          return;
        }
      
        const fileArray = Object.entries(files).map(([filename, content]) => ({
          filename,
          content: content || ' ', // Ensure content is non-empty
        }));
      
        console.log('Saving files:', fileArray); // Debug log
      
        try {
          const response = await axios.post(
            'http://localhost:5000/api/react/save',
            { files: fileArray },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log('Files saved successfully:', response.data);
        } catch (error) {
          console.error('Error saving files:', error.response ? error.response.data : error.message);
        }
      };
    
      
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar files={files} currentFile={currentFile} onSelectFile={setCurrentFile}  />
            <div style={{ flexGrow: 1 }}>
            <button onClick={handleSave}>Save</button>
                <Editor
                    height="90vh"
                    defaultLanguage="javascript"
                    value={code}
                    onChange={(value) => setCode(value)}
                />
            </div>
            <div style={{ width: '50%', padding: '10px', backgroundColor: '#f5f5f5' }}>
                <iframe
                    title="output"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    srcDoc={iframeContent}
                />
            </div>
        </div>
    );
};

export default ReactEditor;
