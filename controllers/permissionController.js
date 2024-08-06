const Permission = require('./../models/Permission');
const Role = require('./../models/Role');
const Module = require('./../models/Module')
const Masterroutes = require('./../models/Masterroute');

exports.createPermission = async (req, res) => {
const { roleId, moduleId, can_read, can_write,can_edit,can_delete } = req.body;
  try {
     // Check if a Permission with the same roleId and moduleId already exists
     const existingPermission = await Permission.findOne({
      where: {
        roleId,
        moduleId
      }
    });
    if (existingPermission) {
      // If the permission already exists
       res.status(204).json({ msg: 'Permission with this Role and Module already exists' });
    }else{
    // Create a new Permission
    const newPermission = await Permission.create({
        roleId,
        moduleId,
        can_read,
        can_write,
        can_edit,
        can_delete

    });
    res.status(201).json(newPermission);
  }
  } catch (err) {
    console.error('Error creating Permission:', err);
    res.status(500).json({ error: 'Error creating Permission' });
  }

};

exports.getPermission = async(req,res)=>{
  try {
    const permissions = await Permission.findAll({
     
      include: [{
        model: Role,
        attributes: ['roleName']
      },{
        model: Module,
        attributes:['moduleName']
      }],
      attributes: ['id','can_read','can_write','can_edit','can_delete'],
      order: [['roleID', 'DESC']],
     
    },
    
  );
    res.json(permissions);
  } catch (err) {
    console.error('Error fetching permissions', err);
    res.status(500).json({ error: 'Error fetching permissions' });
  }
 
}

exports.deletePermission = async (req, res) => {
  const permissionId = req.params.id;
  try {
    const permission = await Permission.findByPk(permissionId);

    if (!permission) {
      return res.status(404).json({ error: 'permission not found' });
    }
    await permission.destroy();
    res.json({ message: 'permission deleted successfully' });
  } catch (err) {
    console.error('Error deleting permission', err);
    res.status(500).json({ error: 'Error deleting permission' });
  }
}

exports.getPermissionById = async (req, res) => {
  const permissionId = req.params.id;
  try {
    const permission = await Permission.findByPk(permissionId);

    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    res.status(200).json(permission);
  } catch (error) {
    console.error('Error fetching Permission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updatePermission = async (req, res) => {
 
  const permissionId = req.params.id;
  try {
    const permission = await Permission.findByPk(permissionId);

    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }

      const { roleId, moduleId, can_read, can_write,can_edit,can_delete } = req.body;
      
      // Update permission details
      permission.roleId = roleId;
      permission.moduleId = moduleId;
      permission.can_read = can_read;
      permission.can_write = can_write;
      permission.can_edit = can_edit;
      permission.can_delete = can_delete;

      await permission.save();

      res.json(permission);
   
  } catch (err) {
    console.error('Error updating permission:', err);
    res.status(500).json({ error: 'Error updating permission' });
  }
};

exports.getPermissionByRole = async (req, res) => {
  const { userId } = req.body;
  let masterQuery  ='SELECT Roles.roleName,Modules.moduleName,Permissions.can_read,Permissions.can_write,Masterroutes.route_path,Masterroutes.route_elm,CASE WHEN Permissions.can_read AND Masterroutes.permission_type ="view" THEN Masterroutes.route_path  WHEN Permissions.can_write AND Masterroutes.permission_type ="add" THEN Masterroutes.route_path WHEN Permissions.can_edit AND Masterroutes.permission_type ="edit" THEN Masterroutes.route_path ELSE NULL END AS rpath FROM Permissions INNER JOIN Roles ON Roles.id = Permissions.roleId INNER JOIN Modules ON Modules.id = Permissions.moduleId INNER JOIN Masterroutes ON Permissions.moduleId = Masterroutes.moduleId INNER JOIN Users on Users.roleId = Roles.id where Users.id = ? ORDER BY Roles.roleName ASC';
  try {
    // Execute raw SQL query
    const results = await Permission.sequelize.query(
      masterQuery,
      {
        replacements: [userId],
        type: Permission.sequelize.QueryTypes.SELECT,
      },
    );
    
    res.json(results); 
  } catch (err) {
    console.error('Error fetching permissions by role:', err); // Error handling
    res.status(500).json({ error: 'Error fetching permissions by role' });
  }
};


exports.checkModulePermission = async(req,res)=>{
  const { userId, moduleId } = req.body;
  let masterQuery  ='SELECT Permissions.can_read,Permissions.can_write,Permissions.can_edit,Permissions.can_delete from Users inner join Roles on Users.roleId = Roles.id inner join Permissions on Roles.id = Permissions.roleId inner join Modules on Permissions.moduleId = Modules.id where Users.id = ? and Modules.id = ?';
  try {
    // Execute raw SQL query
    const results = await Permission.sequelize.query(
      masterQuery,
      {
        replacements: [userId,moduleId],
        type: Permission.sequelize.QueryTypes.SELECT,
      },
    );

    res.json(results[0]); 
  } catch (err) {
    console.error('Error fetching permissions by role:', err); // Error handling
    res.status(500).json({ error: 'Error fetching permissions by role' });
  }
}

exports.checkDashboardPermission = async(req,res)=>{
  const { userId } = req.body;
  let masterQuery  ='SELECT Permissions.can_read,Modules.moduleName from Users inner join Roles on Users.roleId = Roles.id inner join Permissions on Roles.id = Permissions.roleId inner join Modules on Permissions.moduleId = Modules.id where Users.id = ? ';
  try {
    // Execute raw SQL query
    const results = await Permission.sequelize.query(
      masterQuery,
      {
        replacements: [userId],
        type: Permission.sequelize.QueryTypes.SELECT,
      },
    );
    
    console.log('Results:', results); 
    res.json(results); 
  } catch (err) {
    console.error('Error fetching permissions by role:', err); // Error handling
    res.status(500).json({ error: 'Error fetching permissions by role' });
  }
}

exports.getPermissionByRoleId = async(req,res)=>{

  const { roleId } = req.params; 
  try {
    const products = await Permission.findAll({
      where: {
        roleId: roleId,
      },
    });
    res.json(products);
  } catch (err) {
    console.error('Error fetching Permission:', err);
    res.status(500).json({ error: 'Error fetching Permission' });
  }
}
