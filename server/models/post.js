const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
//creating the Post schema model(database)
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"

    }
    
})

mongoose.model("Post",postSchema)