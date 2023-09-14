require('dotenv').config()
const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
const path = require('path');
const userRoute = require('./routes/user');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,"public")));
app.use('/user',userRoute);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,"main/"+req.url))
})
sequelize.sync().then((res)=>{app.listen(process.env.PORT)}).catch((err)=>{console.log(err)});

