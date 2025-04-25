import express from 'express'
import { loginUser,registerUser } from "../Controllers/usercontroller.js"

let userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

export default userRouter