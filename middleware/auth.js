const jwt=require('jsonwebtoken');
const User=require('../models/users');


const auth=(req,res,next)=>{
    
    try{
        const token=req.header('Authorization');
        //console.log(token);
        const userid = jwt.verify(token,process.env.secret_key);
        //console.log("jwt_verification",userid);
        User.findByPk(userid.userId).then(user=> {
            //console.log(JSON.stringify(user));
            req.user=user;   // here user field is getting created(.user is key && =user is value)
            console.log('output of auth line 15',user);
            next();
        }).catch(err=> {throw new Error(err)})
    } catch(err){
        console.log(err);
        return res.status(401).json({success: false, error: err.message});
    }
}


let obj={
    name:'abc',
    id:1,
    add:'delhi'
}
const {name,id} = obj;
module.exports={auth};