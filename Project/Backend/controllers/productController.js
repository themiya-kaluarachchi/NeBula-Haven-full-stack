import Product from "../models/product";

export async function createProduct(req, res) {

    if(req.user == null) {
        res.status(401).json(
            {
                message : "Please login and try again"
            }
        )
        return;
    }

    if(req.user.role != "admin") {
        res.status(403).json(
            {
                message : "You are not authorized to perform this action"
            }
        )
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