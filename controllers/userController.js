const User = require('./../models/User')
const { sequelize, Op } = require('sequelize');
const Role = require('./../models/Role');
const bcryptUils = require('./../utils/bcrypt')

exports.createUser = async (req, res) => {

  const { firstName, lastName, email, username, roleId } = req.body;
  try {
    // Create a new user
    const pass = await bcryptUils.encodePassword('Honey@1313');
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      roleId,
      // password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm'
      password:pass
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.getUser = async (req, res) => {
  try {
   
    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: 1 // Exclude user with id 1
        }
      },

      include: [{
        model: Role,
        attributes: ['roleName']
      }],
      attributes: ['id',  'firstName','lastName','email'],
      order: [['createdAt', 'DESC']],
      
    }
  );
    res.json(users);
  } catch (err) {
    console.error('Error fetching users', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user', err);
    res.status(500).json({ error: 'Error deleting user' });
  }
}

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, roleId} = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.roleId = roleId;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error('Error updating user', err);
    res.status(500).json({ error: 'Error updating user' });
  }
};



exports.getUseByRole = async(req,res)=>{

  const { roleId } = req.params; 
  try {
    const users = await User.findAll({
      where: {
        roleId: roleId,
      },
    });
    res.json(users);
  } catch (err) {
    console.error('Error fetching getUseByRole:', err);
    res.status(500).json({ error: 'Error fetching getUseByRole' });
  }
}
