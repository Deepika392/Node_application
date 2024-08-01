const Role = require('./../models/Role')
const { sequelize, Op } = require('sequelize');
const Module = require('./../models/Module');


exports.getModule = async(req,res)=>{
    try {
      const data = await Module.findAll(
        {
          where: {
            id: {
              [Op.ne]: 1 // Exclude user with id 1
            }
          },
          order: [['createdAt', 'ASC']],
        }
      );
      res.json(data);
    } catch (err) {
      console.error('Error fetching Module', err);
      res.status(500).json({ error: 'Error fetching Module' });
    }
  }