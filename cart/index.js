import express from 'express'
import cors from "cors"
import cartRouter from './routes/cartRoute.js'
import { dbConnected } from './utils/db.js'
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"

const app = express()
dotenv.config()
const PORT = process.env.PORT
dbConnected()

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json()); 
app.use(cookieParser());

app.use('/api/cart', cartRouter)

app.listen(PORT, ()=>{
    console.log(`server is running port ${PORT}`);
})
