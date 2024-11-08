// server/app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const codeRoutes = require('./routes/codeRoutes');
const userRoutes = require('./routes/userRoutes');
const reactRoutes = require('./routes/reactRoutes');
const quizRoutes = require('./routes/quizRoutes');


const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', codeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/react', reactRoutes);
app.use('/api/quizzes', quizRoutes);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`MongoDB connected on ${process.env.MONGO_URI}`);
  })
  .catch(err => console.error('Could not connect to MongoDB', err));
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  
  transporter.verify((error, success) => {
    if (error) {
      console.error('Error connecting to SMTP server:', error);
    } else {
      console.log('SMTP server is ready to take our messages:', success);
    }
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));