import React, { useState } from 'react';

const Sidebar = ({ files, currentFile, onSelectFile, onAddFile, onDeleteFile }) => {
    const [newFileName, setNewFileName] = useState('');

    const handleAddFile = () => {
        if (newFileName.trim()) {
            onAddFile(newFileName.trim());
            setNewFileName('');
        }
    };

    const protectedFiles = ['App.js', 'index.js', 'package.json', 'styles.css'];

    return (
        <div style={{ width: '20%', padding: '10px', backgroundColor: '#eee' }}>
            <ul>
                {Object.keys(files).map((file) => (
                    <li
                        key={file}
                        style={{ 
                            cursor: 'pointer', 
                            padding: '5px', 
                            backgroundColor: file === currentFile ? '#ddd' : 'transparent' 
                        }}
                    >
                        <span onClick={() => onSelectFile(file)}>
                            {file}
                        </span>
                        {!protectedFiles.includes(file) && (
                            <button 
                                style={{ marginLeft: '10px' }} 
                                onClick={() => onDeleteFile(file)}
                            >
                                Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="New file name"
            />
            <button onClick={handleAddFile}>Add File</button>
        </div>
    );
};

export default Sidebar;
