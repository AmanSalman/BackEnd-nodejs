import mongoose from "mongoose";

   const connectDB = async ()=>{
    return mongoose.connect(`${process.env.DB}`)
    .then(result=>{
      console.log(`connected`)
    }).catch(err=>{
      console.log(`error to connect db ${err}`)
    })
  }

  export default connectDB;