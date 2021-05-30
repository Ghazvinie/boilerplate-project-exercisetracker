const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/usersRoutes');

// Connect to DB and server listen
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to DB...')
    const listener = app.listen(process.env.PORT || 3000, () => {
      console.log('Your app is listening on port ' + listener.address().port);
    });
  })
  .catch(error => console.log(error));

// Body parsing
app.use(express.urlencoded({ extended: true }));

// Use cors
app.use(cors());

// Static files
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/views/index.html');
});

// User routes
app.use('/api', userRoutes);