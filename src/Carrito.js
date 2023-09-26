import { existsSync, promises } from 'fs'
import { Producto } from './ProductManager';

const path = 'carrito.json'

class Carrito {
    constructor() { }
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
    async addCarro() {
        try {
            const carrito = await this.getCarrito();
            let id = !carrito.length ? id = 1 : id = carrito[carrito.length - 1].id + 1
            const newCart = {id, productos:[]}
            carrito.push(newCart);
            await promises.writeFile(path, JSON.stringify(carrito))
            return carrito
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
    const productIndex = cart.productos.findIndex(
        (p) => p.product === idProducto
);
    if (productIndex === -1) {
    const newProduct = { product: idProducto, quantity: 1 };
    cart.productos.push(newProduct);
    } else {
    cart.productos[productIndex].quantity++;
}
}
}
