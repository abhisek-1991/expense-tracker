const User = require('../models/users');
const bcrypt = require('bcrypt');

function isStringValid(string) {
  return string === undefined || string.length === 0;
}

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ err: "Bad parameters - Something is missing" });
    }
    
   
    const saltrounds = 8;
    bcrypt.hash(password, saltrounds, async(err,hash)=>{
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error hashing password' });
      }
      
      const newUser = await User.create({ name, email, password: hash });
      res.status(201).json({ message: 'Successfully created a new user', user: newUser });

    })
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function login(req,res){
  try {
    const { email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ err: "Bad parameters - Something is missing" });
    }
    
  
    const newUser = await User.findOne({where:{email:email}});
    if(newUser){
      if(newUser.password==password){
        res.status(200).json({ message: 'Successfully logged In' });
      } else{
        res.status(401).json({message: 'wrong password'});

      } 
    } else{
      res.status(404).json({message: 'User not found'});
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = {signup,login};
