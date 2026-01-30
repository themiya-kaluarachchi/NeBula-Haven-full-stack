import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {

    // if(req.user == null) {
    //     res.status(401).json(
    //         {
    //             message : "Please login and try again"
    //         }
    //     )
    //     return;
    // }

    // if(req.user.role != "admin") {
    //     res.status(403).json(
    //         {
    //             message : "You are not authorized to perform this action"
    //         }
    //     )
    //     return;
    // }

    if(!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to perform this action"
        });
        return;
    }

    try {
        
        const productData = req.body;
        const product = new Product(productData);
        await product.save();
        res.json(
            {
                message : "Product created successfully",
                product: product,
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json(
            {
                message : "Failed to create product: " + error.message
            }
        );
    }
}  

export async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json(
            {
                message : "Failed to retrieve products: " + error.message
            }
        );
    }
}

export async function deleteProduct(req, res) {

    if(!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to perform this action"
        });
        return;
    }

    try {
        const productID = req.params.productID;

        await Product.deleteOne(
            { 
                productID: productID 
            }
        );

        res.json(
            {
                message : "Product deleted successfully"
            }
        )
    } catch (error) {
        console.error(error);
        res.status(500).json(
            {
                message : "Failed to delete product: " + error.message
            }
        );
    }
}