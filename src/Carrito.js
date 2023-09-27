import { existsSync, promises } from 'fs';
import { Producto } from './ProductManager.js';

const path = 'carrito.json';

class Carrito {
    constructor() {
    }
    async getCarrito() {
        try {
            if (existsSync(path)) {
                const carroFiles = await promises.readFile(path, 'utf-8');
                const carroData = JSON.parse(carroFiles)
                return carroData
            }else {
                return []
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    async writeCart() {
        try {
            const carro = await this.getCarrito();
            let id = !carro.length ? id = 1 : id = carro[carro.length - 1].id + 1
            const newCart = {id, products:[]}
            carro.push(newCart);
            await promises.writeFile(path, JSON.stringify(carro))
            return carro
        } catch (error) {
            return console.error();
        }
    }
    async getCartById(id){
        try {
            const cart= await this.getCarrito()
            const carrito= cart.find(p=>p.id===id)
            return  carrito;
        } catch (error) {
            return 'lo sentimos, no pudimos continuar con su busqueda'
        }
    }
    async addProductToCart (idCart, idProducto){
    const cart = await this.getCartbyId(idCart)
    if(!cart){
        throw new Error(error.message)
    }
    const producto = await Producto.getProductById(idProducto);
    if (!producto) {
        throw new Error("There is no product with this id");
}
    const productIndex = cart.products.findIndex(
        (p) => p.product === idProducto
);
    if (productIndex === -1) {
    const newProduct = { product: idProducto, quantity: 1 };
    cart.products.push(newProduct);
    } else {
    cart.products[productIndex].quantity++;
}
}
}

export const Carro = new Carrito ()