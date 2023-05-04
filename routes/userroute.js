const express = require("express");
const { UserModel } = require("../models/usermodel");
const userrouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require('dotenv').config();

userrouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const data = await UserModel.find({ email });
  if (data.length!=0) {
    return res.json("Email Id Already Exists");
  }

  try {
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
        res.json({ msg: "Error while hashing the password" });
      } else {
        const new_user = new UserModel({
          username,
          email,
          password: secure_password, 
        });
        await new_user.save();
        res.json({ msg: "Successfully Registered the User" });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error While Registering the User" }); 
  }
});

userrouter.post("/login",async(req,res)=>{
    const {email, password } = req.body;
    let user_data=await UserModel.find({"email":email});
    console.log(user_data);
    let hashed_password=user_data[0].password;
    if(user_data.length>0){
        try {
            bcrypt.compare(password, hashed_password,(err, result)=> {
                if(result){
                    let token=jwt.sign({ UserId:user_data[0]._id }, process.env.key); 
                    res.json({"msg":"Login Successfull","token":token,"UserId":user_data[0]._id})
                }
            });
        } catch (error) {
            console.log(error);
            res.json({"msg":"Error While Logging the User"})
        }
    }
   
})

module.exports = {
  userrouter,
};
