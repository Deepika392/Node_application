const Role = require('./../models/Role')
const { sequelize, Op } = require('sequelize');
const Masterroute = require('./../models/Masterroute');

exports.getRoutes = async (req, res) => {
    try {
        const data = await Masterroute.findAll();
        res.json(data);
    } catch (err) {
        console.error('Error fetching Module', err);
        res.status(500).json({ error: 'Error fetching Module' });
    }
}
