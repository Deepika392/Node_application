
const Role = require('./../models/Role');

exports.findRoleByUserId = async (roleId) => {
    try {
      const role = await Role.findOne({ where: { id: roleId } });
      return role.roleName;
    } catch (err) {
      console.error(err);
      throw new Error('Error fetching role');
    }
  };