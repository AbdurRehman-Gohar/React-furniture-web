import express from "express"
import cors from 'cors'
import { connectdb  } from "./config/db.js"
import productrRouter from "./Routes/productRoute.js"
import userRouter from "./Routes/userRoute.js"
import 'dotenv/config'
import cartRoute from "./Routes/cartRoute.js"
import orderRouter from "./Routes/orderRoute.js"

const app = express() 
const port = process.env.PORT || 4000;

// middleware
app.use(express.json())
app.use(cors())
//  DB connection
connectdb ();
// mongodb+srv://abdurrehmangohar92:<db_password>@cluster0.uyupvqv.mongodb.net/?
app.get('/' ,(req,res)=>{
    res.send("Api Working")
})
// api endpoints
app.use("/api/products",productrRouter)
app.use('/images', express.static('Uploads'));
app.use('/api/user',userRouter)
app.use('/api/user',cartRoute)
app.use("/api/order",orderRouter)
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

