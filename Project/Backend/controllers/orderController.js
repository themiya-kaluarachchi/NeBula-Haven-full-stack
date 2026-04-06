import e from "express";
import Order from "../models/order.js";

export async function createOrder(req, res) {

    // if(req.user == null){
    //     res.status(401).json(
    //         {
    //             message: "unauthorized user"
    //         }
    //     )
    //     return;
    // }

    try {
        const orderList = await Order.find().sort({date: -1}).limit(1)

        let newOrderID = "NB0000001"

        if(orderList.length != 0) {
            let lastOrderIDInString = orderList[0].orderID //"NB0000123"
            let lastOrderNumberInString = lastOrderIDInString.replace("NB", "") //"0000123"
            let lastOrderNumber = parseInt(lastOrderNumberInString) //123
            let newOrderNumber = lastOrderNumber + 1 //124
            // padStart
            let newOrderNumberInString = newOrderNumber.toString().padStart(7, "0") //"0000124"
            
            newOrderID = "NB" + newOrderNumberInString //"NB0000124"
        }

        const newOrder = new Order({
            orderID : newOrderID,
            items : [],
            customerName : req.body.customerName,
            email : req.body.email,
            phone : req.body.phone,
            address : req.body.address,
            total : req.body.total,
            status : "Pending"
        })

        const savedOrder = await newOrder.save()
        res.status(201).json(
            {
                message : "Order created successfully",
                 order : savedOrder
            }
        )
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json(
            {
                message : "Internal server error"
            }
        )
    }
}