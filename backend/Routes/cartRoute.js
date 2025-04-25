import express from "express"
import { addToCart,removeFromCart,cartData } from "../Controllers/cartController.js"
import authMiddleware from "../Middleware/auth.js"
const cartRoute = express.Router();

cartRoute.post("/add", authMiddleware,addToCart)
cartRoute.post("/remove",authMiddleware,removeFromCart)
cartRoute.post("/get",authMiddleware,cartData)

export default cartRoute;        