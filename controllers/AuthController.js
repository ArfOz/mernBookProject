const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
var jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");


exports.authRegister =(req,res)=>{
    const {firstName, lastName, email, password} = req.body;

    //field Validation
    const validationErr = validationResult(req);

    if(validationErr?.errors?.length >0){
        return res.status(400).json({errors:validationErr.array()});
    }

    //user exist check
    const userData = await UserModel.findOne({email});
    if (userData){
        return res.status(400).json({errors:[{message : "user already exists!"}]});
    }

    //password hash
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password,salt);

    //save user
    const user = new user({
        firstName,
        lastName,
        email,
        password:newPassword,
    });
    await user.save();

    res.send("register completed");
}

exports.authLogin = async (req,res)=>{
    const {email, password} = req.body;

    //Field validation
    const validationErr = validationResult(req);
    if (validationErr?.errors?.length > 0){
        return res.status(400).json({errors:validationErr.array()});
    }

    //User exist check
    const userData = await User.findOne({email});
    if(!userData){
        return res.status(400).json({errors:[{message : "Invalid credentials"}]})
    }

    //json web token-jwt
    jwt.sign({userData},process.env.JWT_SECRET_KEY,{ expiresIn:3600},(err, token) => {
        if(err){
            return res.status(400).json({errors:[{message:"unknown error"}]});
        }
        res.send(token);
    }
    );
};