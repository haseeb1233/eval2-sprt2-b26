const express =require("express")
const {UserModel} =require("../model/user.model")
const jwt =require("jsonwebtoken")
require("dotenv").config()
const userRouter=express.Router()



userRouter.post("/encryptmypwd",async(req,res)=>{
    try {
        const {id,password}=req.body
        console.log(id,password)
        const userexist=await UserModel.findOne({id})
    
        if(userexist){
          res.send("user already exist")
        }
       
        const ecryptpassword =jwt.sign({password:password},process.env.secret)
         req.body.password=ecryptpassword
    
    
         const user = new UserModel(req.body)
        await user.save()
        res.send(req.body) 
    } catch (error) {
        console.log(error.message)
    }


})

userRouter.get("/getmypwd",async(req,res)=>{
    const {id}=req.query
    const user = await UserModel.findOne({id})
    const password =user.password
    const decoded = jwt.verify(password,process.env.secret)
    res.send(decoded.password)
})

module.exports={userRouter}