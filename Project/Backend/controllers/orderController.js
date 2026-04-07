import e from "express";
import Order from "../models/order.js";
import Product from "../models/product.js";
import { isAdmin, isCustomer } from "./userController.js";

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
    const user = req.user;
    if (user == null) {
      res.status(401).json({
        message: "Unauthorized user",
      });
      return;
    }

    const orderList = await Order.find().sort({ date: -1 }).limit(1);

    let newOrderID = "NB0000001";

    if (orderList.length != 0) {
      let lastOrderIDInString = orderList[0].orderID; //"NB0000123"
      let lastOrderNumberInString = lastOrderIDInString.replace("NB", ""); //"0000123"
      let lastOrderNumber = parseInt(lastOrderNumberInString); //123
      let newOrderNumber = lastOrderNumber + 1; //124
      // padStart
      let newOrderNumberInString = newOrderNumber.toString().padStart(7, "0"); //"0000124"

      newOrderID = "NB" + newOrderNumberInString; //"NB0000124"
    }

    let customerName = req.body.customerName;
    if (customerName == null) {
      customerName = user.firstName + " " + user.lastName;
    }

    let phone = req.body.phone;
    if (phone == null) {
      phone = "Not Provided";
    }

    const itemsInRequest = req.body.items;

    if (itemsInRequest == null) {
      res.status(400).json({
        message: "Items are required to place an order",
      });
      return;
    }

    if (!Array.isArray(itemsInRequest)) {
      res.status(400).json({
        message: "Items should be an array",
      });
      return;
    }

    const itemsToBeAdded = [];
    let total = 0;

    for (let i = 0; i < itemsInRequest.length; i++) {
      const item = itemsInRequest[i];

      const product = await Product.findOne({ productID: item.productID });

      if (product == null) {
        res.status(400).json({
          code: "PRODUCT_NOT_FOUND",
          message: `Product with ID ${item.productID} not found`,
          productID: item.productID,
        });
        return;
      }

      if (product.stock < item.quantity) {
        res.status(400).json({
          code: "INSUFFICIENT_STOCK",
          message: `Insufficient stock for product with ID ${item.productID}`,
          productID: item.productID,
          availableStock: product.stock,
        });
        return;
      }

      itemsToBeAdded.push({
        productID: product.productID,
        quantity: item.quantity,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });

      total += product.price * item.quantity;
    }

    const newOrder = new Order({
      orderID: newOrderID,
      items: itemsToBeAdded,
      customerName: customerName,
      email: user.email,
      phone: phone,
      address: req.body.address,
      total: total,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();

    for (let i = 0; i < itemsToBeAdded.length; i++) {
      const item = itemsToBeAdded[i];
      await Product.updateOne(
        { productID: item.productID },
        { $inc: { stock: -item.quantity } },
      );
    }

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getOrders(req, res) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    if (isAdmin(req)) {
      const orders = await Order.find().sort({ date: -1 });
      return res.json(orders);
    } else if (isCustomer(req)) {
      const orders = await Order.find({ email: user.email }).sort({ date: -1 });
      return res.json(orders);
    } else {
      return res.status(403).json({
        message: "Unauthorized user",
      });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function updateOrderStatus(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Unauthorized user",
    });
    return;
  }
  const orderID = req.params.orderID;
  const newStatus = req.body.status;

  try {
    await Order.updateOne({ orderID: orderID }, { status: newStatus });

    res.json({
      message: "Order status updated successfully",
    });

  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
}
