import productModel from "../Models/productModel.js";
import fs from 'fs'


const addProduct = async (req,res) =>{
    console.log("Body:", req.body);
    console.log("File:", req.file); // This should print the file info if present

    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    let image_filename = `${req.file.filename}`
    const product = new productModel({
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        description: req.body.description,
        image:image_filename 
    })
    try {
        await product.save();
        res.json({success:true,message:"Product Added"})
        console.log("Inside addProduct", req.body, req.file);
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

const productList = async (req,res) =>{
 try {
    let products = await productModel.find({})
    res.json({success:true,Data:products})
 } catch (error) {
    console.log(error);
        res.json({success:false,message:"Error"})
 }

}

const removeProduct = async (req,res) => {
   try {
    let product = await productModel.findById(req.body.id)
    fs.unlink(`Uploads/${product.image}`,()=>{});
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Product Removed"})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
   }
    
}
export {addProduct,removeProduct,productList}