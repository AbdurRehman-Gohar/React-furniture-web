import express from 'express'
import { addProduct, productList, removeProduct } from '../Controllers/productcontroller.js'
import multer from 'multer'
let productrRouter = express.Router()

const storage = multer.diskStorage({
    destination:"Uploads",
    filename:(req,file,cb)=>{
        return cb(null ,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage})
productrRouter.post("/add",upload.single("image"), addProduct);
productrRouter.get("/get",productList) 
productrRouter.post("/remove",removeProduct)

export default productrRouter