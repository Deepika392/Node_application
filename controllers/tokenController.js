
const { sequelize, Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY ;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const refreshTokens = []; 

