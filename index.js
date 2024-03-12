import express from 'express';
import { initApp } from './src/modules/app.router.js';
import dotenv from 'dotenv';
import connectDB from './DB/Connection.js';
import cors from 'cors';
const app = express();


const corsOptions = {
    origin: 'http://localhost:3000',  // replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
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