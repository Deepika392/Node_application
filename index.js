const express = require('express');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const sequelize = require('./config');
const cors = require('cors');
const User = require('./models/User');
const apiRoutes = require('./routes/api');
const userController = require('./controllers/userController');
const path = require('path');
const app = express();
const port =  4000;

// Allow all origins 
app.use(cors());

// Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Sync Sequelize models with the database
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
  });
 
app.use('/uploads', express.static(path.join(__dirname, './../uploads/')));

// API routes
app.use('/api', apiRoutes);


// Error handling middleware 
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});