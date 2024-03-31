import express from 'express';
import { initApp } from './src/modules/app.router.js';
import dotenv from 'dotenv';
import connectDB from './DB/Connection.js';
import cors from 'cors';
const app = express();


// const corsOptions = {
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
//   };  
  
  
//   app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
dotenv.config();
const PORT = process.env.PORT;


initApp(app,express);
connectDB().then(()=>{
    
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})