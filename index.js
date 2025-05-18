import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json({msg:"router is on!"})
})

app.listen(port, ()=>{
    console.log(`Server is connected on http://localhost:${port}`)
})