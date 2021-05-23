const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const Post = mongoose.model('Post')

router.get('/allposts',requireLogin,(req,res)=>{
    Post.find() // displays all the posts in the table but doesn't display that who posted it
    .populate("postedBy","_id name") //therefore we mention it explicitly using the populate function
    .then(posts=>{
        res.json({posts})//show all the posts
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res)=>{ // passing middleware to makesure the user is logged in
    const{title,body,pic}=req.body // getting the title and body from the user
    if(!title || !body ||!pic){
        return res.status(422).json({error:"Please add all fields"})
    }
    req.user.password=undefined // *hence we set the password undefined so it doesn't gets displayed
     const post=new Post({  //creating a new post in the Post schema
        title,
        body,
        photo:pic,
        postedBy:req.user //gives even the pswd of the user therefore go to *
     })
     post.save().then(result=>{
         res.json({post:result})
     })
     .catch(err=>{
         console.log(err)
     })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports=router