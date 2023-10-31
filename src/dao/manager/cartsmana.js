import { cartModel } from "../models/carts.model.js";

class CartManager {
        async createCart() {
            const newCart = {productos: [] };
            const response = await cartModel.create(newCart)
            return response 
        }
        async findCartById(idCart) {
            const response = await cartModel
            .findById(idCart)
            .populate("products.product", ["name", "price"]);
          return response;
        }
        async addProductToCart(idCart, idProduct) {
            const cart = await cartModel.findById(idCart)
            const productIndex = cart.productos.findIndex((p)=>p.product.equals(idProduct))
            if(productIndex === -1) {
                cart.productos.push({product:idProduct,quantity:1})
            }else {
                cart.productos[productIndex].quantity++;
            }
            return cart.save()
        }
}

export const cartManager = new CartManager()