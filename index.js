import express from 'express';
import { initApp } from './src/modules/app.router.js';
import dotenv from 'dotenv';
import connectDB from './DB/Connection.js';
import cors from 'cors';
const app = express();


const allowedOrigins = ["http://localhost:5173", "https://dashboardgraduation.onrender.com"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
  },
  methods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, // Set to true if you're passing cookies or authorization headers
  preflightContinue: false
  
}));
  
dotenv.config();
const PORT = process.env.PORT || 9000;


initApp(app,express);
connectDB().then(()=>{
    
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})