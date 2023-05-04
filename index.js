const express=require('express');
const{connection}=require("./config/db");
const {userrouter}=require('./routes/userroute')
const cors=require('cors')

require('dotenv').config(); 

const app=express();


app.use(express.json());

app.use(cors({
    origin:"*"
}))


app.get("/",(req,res)=>{
    res.json("welcome")   
})
app.use("/users",userrouter)

app.listen(process.env.port,async()=>{ 
    try {
        await connection
        console.log("Connected to Database");
       
    } catch (error) {
       
        console.log(error); 
        console.log('Error while connecting to Database');
    }
    console.log(`Server is running on port ${process.env.port}`)
})
