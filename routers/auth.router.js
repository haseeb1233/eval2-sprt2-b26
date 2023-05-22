const express =require("express")
const {authModel} =require("../model/auth.model")
const bcrypt =require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const {auth} = require("../middleware/auth.middleware")
const {authorization}=require("../middleware/auth.middleware")
const {blacklist}=require("../blacklist/blacklist")
const authRouter=express.Router()


authRouter.post("/signup",async(req,res)=>{
      
      try {
        
        const {id,password}=req.body
        console.log(id,password)
        const userexist=await authModel.findOne({id})
        if(userexist){
            res.send("user already exist")
          }

           await bcrypt.hash(password,5, async function(err, hash) {
             req.body.password=hash
             const user = new authModel(req.body)
           await user.save()
        res.send("signup suceesfully") 
        });
        

        

      } catch (error) {
        console.log(error.message)
      }

})

authRouter.post("/login",async(req,res)=>{
    const {id,password}=req.body
    const user=await authModel.findOne({id})
     if(!user){
       return res.send("user not found")
     }
    await bcrypt.compare(password,user.password, function(err, result) {
        if(result){
            const token = jwt.sign({id:id},process.env.secret,{ expiresIn: '60s' })
            const refreshtoken =jwt.sign({id:id},process.env.rsecret,{ expiresIn: '60s' })
            res.send({"token":token,"refreshtoken":refreshtoken})
        }
    })
})

authRouter.get("/products",auth,(req,res)=>{
    res.send("product")
})

authRouter.get("/addproducts",auth,authorization(["seller"]),(req,res)=>{
    res.send("product added")
})

authRouter.get("/deleteproducts",auth,authorization(["seller"]),(req,res)=>{
    res.send(" deleted product")
})



authRouter.get("/refreshtoken",(req,res)=>{
    const token1 = req.headers.authorization
      
    if(!token1){
        res.send({"msg":"unauthorized"})
    }
    const token = jwt.sign({id:id},process.env.secret,{ expiresIn: '60s' })
            const refreshtoken =jwt.sign({id:id},process.env.rsecret,{ expiresIn: '60s' })
            res.send({"token":token,"refreshtoken":refreshtoken})
})


authRouter.get("/logout",(req,res)=>{
    const token =req.headers.authorization
    blacklist.push(token)
    res.send("logout sucees")
  
})




module.exports ={authRouter}