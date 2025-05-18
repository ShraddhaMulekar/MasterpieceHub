import express from "express";
import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

const passValid =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|]).{8,}$/;

// register user
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!passValid.test(password)) {
    return res.json({
      msg: "password contain min 8 digit char at least one uppercase letter, one digit!",
    });
  }

  try {
    const matchEmail = await UserModel.findOne({ email });
    if (matchEmail) {
      console.log("user already registered! Please Log in now!", matchEmail);
      return res.json({
        msg: "user already registered! Please Log in now!",
        matchEmail,
      });
    } else {
      bcrypt.hash(
        password,
        Number(process.env.SALTROUNDS),
        async (err, hash) => {
          if (err) {
            console.log("Invalid password!", err);
            return res.json({ msg: "Invalid password!", err });
          } else {
            let newUser = await UserModel({ name, email, password: hash });
            await newUser.save();
            console.log("registration successful!", newUser);
            return res.json({ msg: "registration successful!", newUser });
          }
        }
      );
    }
  } catch (error) {
    console.log("error in register route!", error);
    return res.json({ msg: "error in register route!", error });
  }
});

//log in user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    console.log("email & password both are required!")
    return res.json({msg:"email & password both are required!"})
  }

  try {
    const matchEmail = await UserModel.findOne({ email });
    if (!matchEmail) {
      console.log("user not found. Please register firstly!", matchEmail);
      return res.json({
        msg: "user not found. Please register firstly!",
        matchEmail,
      });
    } else {
      bcrypt.compare(password, matchEmail.password, async (err, result) => {
        if (err) {
          console.log("error here..", err);
          return res.json({ msg: "error here..", err });
        } 
        if(result) {
          let payload = {
            userId: matchEmail._id,
          };
          let token = jwt.sign(payload, process.env.TOKEN);
          console.log("Log in successful!", token);
          return res.json({ msg: "Log in successful!", token });
        } else{
            console.log("password invalid!");
            return res.json({ msg: "password invalid!"});
        }
      });
    }
  } catch (error) {
    console.log("error in log in route", error);
    return res.json({ msg: "error in log in route", error });
  }
});

userRouter.get("/", (req, res) => {
  res.json({ msg: "user router connected!" });
});

export default userRouter;
