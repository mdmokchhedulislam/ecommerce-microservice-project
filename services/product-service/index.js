import express from 'express'
import cors from "cors"
import productRouter from './routes/productRoute.js'
import { dbConnected } from './utils/db.js'
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"

const app = express();
dotenv.config()
const PORT = process.env.PORT

dbConnected();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', // React app port (Vite হলে 5173)
  credentials: true
}));

app.use('/api/product', productRouter)
// app.use('/api/product/brand', brandRouter)
// app.use('/api/category', categoryRouter)
app.use(cookieParser());

app.listen(PORT, ()=>{
    console.log(`server is running port ${PORT}`);
    
})