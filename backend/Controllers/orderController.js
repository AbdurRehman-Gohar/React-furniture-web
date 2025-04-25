import { request } from "express";
import orderModel from "../Models/orderModel.js";
import userModel from '../Models/userModel.js'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//  placing user order for frontend

const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173"
    try {
        let neworeder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await neworeder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "pkr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "pkr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        })
        // console.log("Order ID:", neworeder._id);
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${neworeder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${neworeder._id}`

        })
        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error);

        res.json({ success: false, message: "Error" })
    }
}


const verifyOrder = async (req, res) => {
    const { orderID, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderID, { payment: true })
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderID)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })

    }
}

//  users order for frontend  

const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

// listing orders for admin panel

const listOrders = async (req, res) => {

     try {
        const orders = await orderModel.find({})
        res.json({success:true,data:orders})
     } catch (error) {
        console.log(error);
        res.json({success:false,data:"error"})
        
     }
}
export { placeOrder, verifyOrder, userOrder ,listOrders } 