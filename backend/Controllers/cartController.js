import userModel from '../Models/userModel.js'


const addToCart = async (req, res) => {
    try {
        let user = await userModel.findOne({ _id: req.body.userId })
        let cartData = await user.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "added to cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

const removeFromCart = async (req, res) => {
   try {
    let user = await userModel.findById({ _id: req.body.userId })
    let cartData = await user.cartData;
    if (cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId] -= 1
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData })
    res.json({success:true,message:"Removed from Cart"})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
   }
}

const cartData = async (req, res) => {
  try {
    let user = await userModel.findById({ _id: req.body.userId })
    let cartData = await user.cartData;
    res.json({success:true,cartData})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error})
  }
}

export {addToCart,removeFromCart,cartData}