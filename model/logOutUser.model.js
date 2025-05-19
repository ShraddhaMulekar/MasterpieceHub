import mongoose from "mongoose";

const LogOutUserSchema = new mongoose.Schema({
    token : {type:String, required:true},
    createdAt : {type:Date, default:Date.now}
}, {
    versionKey:false
})

const LogOutUserModel = mongoose.model("logOut", LogOutUserSchema)

export default LogOutUserModel