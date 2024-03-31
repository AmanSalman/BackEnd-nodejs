import express from 'express';
import { initApp } from './src/modules/app.router.js';
import dotenv from 'dotenv';
import connectDB from './DB/Connection.js';
import cors from 'cors';
const app = express();


const corsOptions = {
    origin: '*',
    methods:['GET,HEAD,PUT,PATCH,POST,DELETE'],
    credentials: true,
    optionsSuccessStatus: 200,
  };  
  
  
  app.use(cors(corsOptions));
  
dotenv.config();
const PORT = process.env.PORT;


initApp(app,express);
connectDB().then(()=>{
    
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})