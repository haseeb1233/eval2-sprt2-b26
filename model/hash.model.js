const mongoose=require("mongoose")



const hashSchema=mongoose.Schema({
    id:Number,
    password:String
})


const HashModel=mongoose.model("hashs",hashSchema)



module.exports={HashModel}