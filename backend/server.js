import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import connectMongoDB from "./db/connectDb.js";

dotenv.config()

const app = express();
const PORT =process.env.PORT || 8000

app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.use('/api/auth',authRoutes)
console.log(process.env.MONGO_DB_URI);


app.listen( PORT,()=>{
    console.log("Server is running on port 8000");
    connectMongoDB()
})