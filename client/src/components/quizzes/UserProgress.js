// src/components/UserProgress.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProgress = () => {
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        const fetchProgress = async () => {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
            const response = await axios.get('http://localhost:5000/api/user-progress', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProgress(response.data);
        };
        fetchProgress();
    }, []);

    return (
        <div>
            <h2>Your Quiz Progress</h2>
            {progress.map((entry) => (
                <div key={entry._id}>
                    <h3>{entry.quizId.title}</h3>
                    <p>Score: {entry.score}</p>
                    <p>Completed at: {new Date(entry.completedAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default UserProgress;
