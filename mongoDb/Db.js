import mongoose from "mongoose";

const DbConnected = (async()=>{
    await mongoose.connect(process.env.DB_URL)
    console.log("mongo db connected!")
})

export default DbConnected