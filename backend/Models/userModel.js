import mongoose from 'mongoose'

let userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
} ,{minimize:false})
// minimize false is set to create cart data because we have not added any data in it

const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel