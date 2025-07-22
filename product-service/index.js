import express from 'express'
import productRouter from './routes/productRoute.js'
import brandRouter from './routes/brandRoute.js'
import categoryRouter from './routes/categoryRoute.js'
import { dbConnected } from './utils/db.js'


const app = express()
dbConnected()

app.use('/api', productRouter)
app.use('/api', brandRouter)
app.use('/api', categoryRouter)

app.listen(3000, ()=>{
    console.log("server is running port 3000");
    
})