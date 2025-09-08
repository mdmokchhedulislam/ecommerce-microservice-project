import express from 'express'
import cors from "cors"
import productRouter from './routes/productRoute.js'
import brandRouter from './routes/brandRoute.js'
import categoryRouter from './routes/categoryRoute.js'
import { dbConnected } from './utils/db.js'
import cookieParser from 'cookie-parser';



dbConnected()
const app = express()
app.use(cors({
  origin: 'http://localhost:5173', // React app port (Vite হলে 5173)
  credentials: true
}));
app.use('/api/product', productRouter)
app.use('/api/brand', brandRouter)
app.use('/api/category', categoryRouter)
app.use(cookieParser());

app.listen(3001, ()=>{
    console.log("server is running port 3001");
    
})