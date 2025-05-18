import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next)=>{
    let token = req.headers.Authorization?.split(" ")[1]

    if(!token){
        console.log("Access decline!")
        return res.json({msg:"Access decline!"})
    }
    
    try {

        let decoded = jwt.verify(token, process.env.TOKEN)
        req.user = {id:decoded.userId}
        next()

    } catch (error) {
        console.log("error in auth middleware!", error)
        return res.json({msg:"error in auth middleware!", error})
    }
}

export default authMiddleware