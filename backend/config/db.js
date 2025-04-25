import mongoose from "mongoose";

 export const connectdb  = async () =>{
    await mongoose.connect('mongodb+srv://abdurrehmangohar92:furnitureweb123@cluster0.uyupvqv.mongodb.net/furniture-web').then(()=>console.log("DB Connected")
    )
}