
const jwt = require("jsonwebtoken")
const {authModel} = require("../model/auth.model")
const { blacklist } = require("../blacklist/blacklist")
const auth = async (req,res,next)=>{
   
    const token = req.headers.authorization

    if(blacklist.includes(token)){
        res.send("pls login first")
    }
      console.log(token)
    if(!token){
        res.send({"msg":"unauthorized"})
    }


    const decoded = jwt.verify(token,process.env.secret)

    const id =decoded.id

    const user = await authModel.findOne({id})

    req.user =user
    next()
}



 function authorization (roles){
    return (req,res,next)=>{
        console.log(req.user.role,roles.includes(req.user.role))
         if(roles.includes(req.user.role)){
            next()
         }else{
            res.send("unauthorized")
         }
    }
}

module.exports ={auth,authorization}