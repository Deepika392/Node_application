
const { sequelize, Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY ;


exports.token = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken || !refreshToken.includes(refreshToken)) {
      return res.status(403).json({ error: 'Refresh token invalid' });
    }
  
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid refresh token' });
      }
  
      const newTokens = generateTokens(user);
      res.json(newTokens);
    });
  };
  