const express =require("express")
const {HashModel} =require("../model/hash.model")
const bcrypt =require("bcrypt")
require("dotenv").config()
const hashRouter=express.Router()


hashRouter.post("/hashmypwd",async(req,res)=>{
      
      try {
        
        const {id,password}=req.body
        console.log(id,password)
        const userexist=await HashModel.findOne({id})
        if(userexist){
            res.send("user already exist")
          }

           await bcrypt.hash(password,5, async function(err, hash) {
             req.body.password=hash
             const user = new HashModel(req.body)
           await user.save()
        res.send(req.body) 
        });
        

        

      } catch (error) {
        console.log(error.message)
      }

})



hashRouter.post("/verifymypwd",async(req,res)=>{
    const {id,password}=req.body
    const user=await HashModel.findOne({id})
     if(!user){
       return res.send("user not found")
     }
    await bcrypt.compare(password,user.password, function(err, result) {
        res.send(result)
    })

})

module.exports={hashRouter}