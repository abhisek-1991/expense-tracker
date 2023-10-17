const jwt=require('jsonwebtoken');
const User=require('../models/users');

const auth=(req,res,next)=>{
    
    try{
        const token=req.header('Authorization');
        //console.log(token);
        const userid = jwt.verify(token,'2FZqU9LD69XtZJG9xdbiVwKo9SPxKZxY');
        console.log("jwt_verification",userid);
        User.findByPk(userid.userId).then(user=> {
            //console.log(JSON.stringify(user));
            req.user=user;
            next();
        }).catch(err=> {throw new Error(err)})
    } catch(err){
        console.log(err);
        return res.status(401).json({success: false, error: err.message});
    }
}

module.exports={auth};