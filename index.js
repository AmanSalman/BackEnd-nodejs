import express from 'express';
import { initApp } from './src/modules/app.router.js';
import dotenv from 'dotenv';
import connectDB from './DB/Connection.js';
const app = express();

dotenv.config();
const PORT = process.env.PORT;


initApp(app,express);
connectDB().then(()=>{
    
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})