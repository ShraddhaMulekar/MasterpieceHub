import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import DbConnected from "./mongoDb/Db.js"
import userRouter from "./routes/user.route.js"
dotenv.config()
const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())

app.use("/user", userRouter)

app.listen(port, async()=>{
    await DbConnected()
    console.log(`Server is connected on http://localhost:${port}`)
})