import express from 'express'
import cors from "cors"
import cartRouter from './routes/cartRoute.js'
import { dbConnected } from './utils/db.js'
import cookieParser from 'cookie-parser';

dbConnected()
const app = express()

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json()); 
app.use(cookieParser());

app.use('/api/cart', cartRouter)

app.listen(3002, ()=>{
    console.log("server is running port 3002");
})
