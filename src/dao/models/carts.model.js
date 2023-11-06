import mongoose from "mongoose"

const cartSchema= new mongoose.Schema({
    products: [{
        _id: false,
        product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Products",
        },
        quantity: {
            type: Number,
        },
    }]
})


export const cartModel = mongoose.model("carts", cartSchema)