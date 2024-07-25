const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for hashing

exports.comparePasswords = async ( rawPassword,DBPassword) => {
   try {
      const match = await bcrypt.compare( rawPassword, DBPassword);
      return match;
   } catch (err) {
     console.error(err);
     throw new Error('Error comparing passwords');
   }
 };