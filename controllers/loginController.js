const User = require('./../models/User');
const userService = require('./../service/userService');
const bcryptUils = require('./../utils/bcrypt');
const roleService = require('./../service/roleService');
const { json } = require('body-parser');

exports.login = async (req, res) => {

  const { username, password } = req.body;
  try {
    const user = await userService.findUser(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else {

      let pass = await bcryptUils.comparePasswords(password, user.password);

      if (pass === false) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      // Fetch the user's role from the role table
      const role = await roleService.findRoleByUserId(user.roleId); 
     
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
      const userResponse = {
        ...user.toJSON(),
        role: role 
      };
  
      return res.status(200).json(userResponse);

    }
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Something went wrong!!' });
  }
};
