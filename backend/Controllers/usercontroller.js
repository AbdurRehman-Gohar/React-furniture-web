import userModel from '../Models/userModel.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


const loginUser = async (req, res) => {
    let { email, password } = req.body
    try {
        let user = await userModel.findOne({email})
        if(!user){
            return res.json({ success: false, message: "user not exists" })
        }

        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({ success: false, message: "invalid credentials" })
        }

        const token = createToken(user._id)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
const registerUser = async (req, res) => {
    let { name, email, password } = req.body
    try {
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.json({ success: false, message: "user already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter an 8 digit password" })
        }

        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)

        const newuser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        let user = await newuser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "this is a error" })
    }
}

export { loginUser, registerUser }