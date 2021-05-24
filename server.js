const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/usersRoutes');

app.use(cors());

// Static files
app.use(express.static('public'));








// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// User routes
app.use('/api', userRoutes);



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});