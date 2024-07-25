const User = require('./../models/User');
const userService = require('./../service/userService');
const bcryptUils = require('./../utils/bcrypt');


exports.login = async (req, res) => {

    const { username, password } = req.body;
    try {
        const user = await  userService.findUser(username);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }else{
          
            let pass = await bcryptUils.comparePasswords(password,user.password);
          
            if(pass === false){
                return res.status(401).json({ error: 'Invalid password' });
            }
            return  res.status(201).json(user);
           
        }
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Something went wrong!!' });
    }
  };
  