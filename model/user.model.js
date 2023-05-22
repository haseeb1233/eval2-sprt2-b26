const mongoose=require("mongoose")



const userSchema=mongoose.Schema({
    id:Number,
    password:String
})


const UserModel=mongoose.model("users",userSchema)



module.exports={UserModel}