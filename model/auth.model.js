const mongoose=require("mongoose")



const authSchema=mongoose.Schema({
    id:Number,
    name:String,
    password:String,
    role:String,
})



const authModel=mongoose.model("auth",authSchema)



module.exports={authModel}