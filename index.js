const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const sequelize = require('./config');
const cors = require('cors');
const User = require('./models/User');
const apiRoutes = require('./routes/api');
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

// //refreshToken
// app.post('/token', (req, res) => {
//   const { refreshToken } = req.body;
//   if (!refreshToken || !refreshToken.includes(refreshToken)) {
//     return res.status(403).json({ error: 'Refresh token invalid' });
//   }

//   jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid refresh token' });
//     }

//     const newTokens = generateTokens(user);
//     res.json(newTokens);
//   });
// });


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