import express from 'express'
import cors from "cors"
import invoiceRouter from "./routes/invoiceRouter.js"

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

app.use('/api/invoice', invoiceRouter)

app.listen(3005, ()=>{
    console.log("server is running port 3005");
})
