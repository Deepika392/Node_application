const User = require('./../models/User');
const userService = require('./../service/userService');
const bcryptUils = require('./../utils/bcrypt');
const roleService = require('./../service/roleService');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY ;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const refreshTokens = []; 

exports.login = async (req, res) => {
  
  const { username, password } = req.body;

  try {
    const user = await userService.findUser(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const pass = await bcryptUils.comparePasswords(password, user.password);
    if (!pass) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Fetch the user's role from the role table
    const role = await roleService.findRoleByUserId(user.roleId);
    
    
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

 
    // Create a JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: role },
      JWT_SECRET,
      { expiresIn: '9h' } // Token expiration time
    );
    
    // Generate JWT refresh token
    const refreshToken = jwt.sign(
      { userId: user.id },
      JWT_REFRESH_SECRET,
      { expiresIn: '7h' } // Refresh token expiration time
    );

    refreshTokens.push(refreshToken);
    const userResponse = {
      ...user.toJSON(),
      role: role,
      token: token ,// Include the token in the response
      refreshToken: refreshToken // Include the refresh token in the response
    };

    return res.status(200).json(userResponse);

  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Something went wrong!!' });
  }
};

exports.refreshToken = (req, res) => {
  try{
  const { refreshToken } = req.body;
  
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
      return res.status(401).json({ error: 'Forbidden' });
    }

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, user) => {
      if (err) return res.status(401).json({ error: 'Forbidden' });

      // Generate new access token
      const accessToken = jwt.sign(
        { userId: user.userId },
        JWT_SECRET,
        { expiresIn: '15m' } // Access token expiration time
      );

      // Optionally generate a new refresh token and update storage
      const newRefreshToken = jwt.sign(
        { userId: user.userId },
        JWT_REFRESH_SECRET,
        { expiresIn: '7d' } // Refresh token expiration time
      );

      // Remove the old refresh token and store the new one
      const index = refreshTokens.indexOf(refreshToken);
      if (index > -1) {
        refreshTokens.splice(index, 1);
      }
      refreshTokens.push(newRefreshToken);

      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: newRefreshToken // Optional: return new refresh token
      });
    });
}catch(e){
  console.log('eeeeeeeeeeeeeeeeeee',e);
  
}
};