
const User = require('./../models/User');

exports.findUser = async (username) => {
    try {
      const user = await User.findOne({ where: { username } });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error('Error fetching user by username');
    }
  };