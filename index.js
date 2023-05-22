const express = require("express")
require("dotenv").config()
const {connection}=require("./config/db")
const {userRouter} = require("./routers/users.router")
const {hashRouter}=require("./routers/hash.routers")
const {authRouter}=require("./routers/auth.router")
const app =express()
app.use(express.json())


app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/hash",hashRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to mongodb")
        
    } catch (error) {
        console.log(error.message)
    }
    console.log(`connected to ${process.env.port}`)
})