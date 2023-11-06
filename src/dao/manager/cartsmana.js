import { cartModel } from "../models/carts.model.js";

class CartManager {
        async createCart() {
            const newCart = {products: [] };
            const response = await cartModel.create(newCart)
            return response 
        }
        async findCartById(idCart) {
            const response = await cartModel.findById(idCart).populate('products.product', ["title", "description", "price", "code"]);
            console.log(response);
            return response
        }
        async addProductToCart(idCart, idProduct) {
            const cart = await cartModel.findById(idCart)
            const productIndex = cart.products.findIndex((p)=>p.product.equals(idProduct))
            if(productIndex === -1) {
                cart.products.push({product:idProduct,quantity:1})
            }else {
                cart.products[productIndex].quantity++;
            }
            return cart.save()
        }
        async deleteProductToCart(idCart, idProduct){
            const cart = await cartModel.findById(idCart)
            const productIndex = cart.products.findIndex((p)=>p.product.equals(idProduct))
            if(productIndex === 1){
                const dlt = cart.products.filter(product => product != productIndex)
                return dlt
            }else {
                console.log('Product not found');
            }
            return cart.save()
        }
        async UpdateCart(idCart, productNew) {
            const cart = await cartModel.findById(idCart)
            cart.products = productNew
            return cart.save();
        }
        async deleteCart(idCart){
            const cart = cartModel.findById(idCart);
            if(!cart){
                return "cart does not exist"
            }
            cart.products = [];
            return cart.save()
        }
        async updateQuantity(idCart, idProduct, quantity) {
            const cart = await cartModel.findById(idCart);
            if(!cart){
                return "cart does not exist"
            }
            const productIndex = cart.products.findIndex((p)=>p.product.equals(idProduct))
            if(productIndex === -1) {
                return "product does not exist"
            }else {
                cart.products[productIndex]=quantity
            }
            return cart.save()
        }
}

export const cartManager = new CartManager()