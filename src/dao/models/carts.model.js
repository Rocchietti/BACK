import mongoose, { SchemaType } from "mongoose"

const cartSchema= new mongoose.Schema({
    productos: [{
        product: {
            type: SchemaType.ObjectId,
            ref: 'products', 
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        _id:false
    }]
})


export const cartModel = mongoose.Model("carts", cartSchema)