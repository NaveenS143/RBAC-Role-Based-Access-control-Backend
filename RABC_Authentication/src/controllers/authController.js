const  User = require('../models/userModel.js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const register = async(req,res) => {
    // Implement registration logic here
    try{
        const {username,password,role}=req.body;
        const user=await User.findOne({username});

        if(user){
            return res.status(404).json({message: "Username already exists"})
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser=new User({username,password:hashedPassword,role});
        await newUser.save();
        res.status(201).json({message:`Registration done successfully with username ${newUser.username}`})
    }catch(err){
        res.status(400).json({message: "something went wrong"})
    }
};

const login = async(req,res) => {
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});

        if(!user){
            return res.status(404).json({message: "Invalid username"})
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid password"})
        }

        const token=jwt.sign({id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );

        res.status(200).json({token});
    }catch(err){
        return res.status(500).json({message: "Something went wrong"})
    }
};

module.exports = {register, login};