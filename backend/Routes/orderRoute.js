import express from 'express'
import { listOrders, placeOrder, userOrder, verifyOrder } from '../Controllers/orderController.js'
import authMiddleWare from '../Middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post("/place",authMiddleWare,placeOrder)
orderRouter.post('/verify' ,verifyOrder)
orderRouter.post('/userorder' , authMiddleWare , userOrder)
orderRouter.get("/list" , listOrders)
export default orderRouter