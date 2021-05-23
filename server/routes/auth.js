const express = require("express")
const router = express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const{JWT_SECRET}=require('../keys')
const requireLogin=require("../middlewares/requireLogin")


router.post('/signup',(req,res)=>{
    const{name,email,password}=req.body
    if(!email || !name || !password)
    {
       return res.status(422).json({error:'Please add all credentials'})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User email already exists"})
        }
        bcrypt.hash(password,12).then(hashedpassword=>{
            const user=new User({
                email,
                password:hashedpassword,
                name
            })
            user.save()
            .then(user=>{
                res.json({message:"Saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    }).catch(err=>{
        console.log(err)
    })
})
router.post('/signin',(req,res)=>{
    const{email,password}=req.body
    if(!email || !password)
    {
       return res.status(422).json({error:'Please add all credentials'})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Incorrect email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email}=savedUser
                res.json({token,user:{_id,name,email}})
                //res.json({message:"Successfully signed in"})
            }
            else{
                return res.status(422).json({error:"Incorrect email or password"})
            }
        })
   
    .catch(err=>{
         console.log(err)
         })
    })
})
module.exports=router
   