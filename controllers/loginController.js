const User = require('./../models/User');
const userService = require('./../service/userService');
const bcryptUils = require('./../utils/bcrypt');
const roleService = require('./../service/roleService');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY ;

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
      { userId: user.id, username: user.username, role: role.name },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time
    );
    

    const userResponse = {
      ...user.toJSON(),
      role: role,
      token: token // Include the token in the response
    };

    return res.status(200).json(userResponse);

  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Something went wrong!!' });
  }
};