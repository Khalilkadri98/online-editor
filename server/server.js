// server/app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const codeRoutes = require('./routes/codeRoutes');
const userRoutes = require('./routes/userRoutes');
const reactRoutes = require('./routes/reactRoutes');

const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', codeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/react', reactRoutes);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`MongoDB connected on ${process.env.MONGO_URI}`);
  })
  .catch(err => console.error('Could not connect to MongoDB', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



