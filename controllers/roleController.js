const Role = require('./../models/Role')
const { sequelize, Op } = require('sequelize');

exports.createRole = async (req, res) => {

  const { roleName } = req.body;
  // Validate roleName length
  if (!roleName || roleName.length > 100) {
    return res.status(400).json({ error: 'roleName must be between 1 and 100 characters long' });
  }
  try {
    // Create a new role
    const newRole = await Role.create({
      roleName: roleName
    });
    res.status(201).json(newRole);
  } catch (err) {
    console.error('Error creating role:', err);
    res.status(500).json({ error: 'Error creating Role' });
  }
};


exports.getRole = async (req, res) => {
  try {
    const roles = await Role.findAll(
      {
        where: {
          id: {
            [Op.not]: 1
          }
        },
        order: [['createdAt', 'DESC']]
      });
    res.json(roles);
  } catch (err) {
    console.error('Error fetching roles', err);
    res.status(500).json({ error: 'Error fetching roles' });
  }
}

exports.getRoleById = async (req, res) => {
  const roleId = req.params.id;
  try {
    const role = await Role.findByPk(roleId);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updateRole = async (req, res) => {
  const roleId = req.params.id;
  const { roleName } = req.body;
  // Validate roleName length
  if (!roleName || roleName.length > 100) {
    return res.status(400).json({ error: 'roleName must be between 1 and 100 characters long' });
  }
  try {
    const role = await User.findByPk(roleId);

    if (!role) {
      return res.status(404).json({ error: 'role not found' });
    }

    // Update role data
    role.roleName = roleName;

    role.id = roleId;
    await role.save();
    res.json(role);
  } catch (err) {
    console.error('Error updating role', err);
    res.status(500).json({ error: 'Error updating role' });
  }
};


exports.updateRole = async (req, res) => {
  const roleId = req.params.id;
  const { roleName } = req.body;

  try {
    const role = await Role.findByPk(roleId);

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Update role data
    role.roleName = roleName;
    role.roleId = roleId;
    await role.save();

    res.json(role);
  } catch (err) {
    console.error('Error updating role', err);
    res.status(500).json({ error: 'Error updating role' });
  }
};

exports.deleteRole = async (req, res) => {
  const roleId = req.params.id;
  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    await role.destroy();

    res.json({ message: 'Role deleted successfully' });
  } catch (err) {
    console.error('Error deleting Role', err);
    res.status(500).json({ error: 'Error deleting Role' });
  }
}