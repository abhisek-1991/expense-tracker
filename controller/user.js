const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const generateAccessToken = (id,prem) => {
  return jwt.sign({ userId: id ,isPremium:prem} ,process.env.secret_key);
}


async function login(req, res) {
  try {
    //console.log('output of login function line 43===>', req.body);
    //console.log("login +++++ ",req);
    const { email, password } = req.body;

    //console.log('login +++++++',email);
    if (!email || !password) {
      return res.status(400).json({ err: 'Bad parameters - Something is missing' });
    }

    const user = await User.findOne({ where: { email: email } });
    //console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const userId = user.dataValues.id;
      const prem = user.dataValues.isPremium;
      //console.log("contents of userId==========>>>>",user.dataValues.isPremium);
      if (result) {
        res.status(200).json({ message: 'Successfully logged in' ,token: generateAccessToken(userId,prem)});
      } else {
        res.status(401).json({ message: 'Wrong password' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports = {signup,login,generateAccessToken};
