import { Router, json } from 'express';
import { cartManager } from '../dao/manager/cartsmana.js';


const router = Router(); 

router.get('/:idCart', async (req, res) => {
    const {idCart} = req.params
    try {
        const productsToCart = await cartManager.findCartById(idCart)
        res.status(200).json({message: 'Carrito', productsToCart})
    } catch (error) {
        return res.status(404).json({message: 'No se pudo conectar con el servidor'})
    }
}) 
router.post('/', async(req,res)=> {
    try {
        const update = await cartManager.createCart()
        res.status(200).json({message: 'Carrito creado', carrito: update})
    } catch (error) {
        return res.status(500).json({message: error})
    }
});
router.put('/:idCart', async (req, res) => {
    const {idCart} = req.params
    console.log(req.body);
    try {
        const response = await cartManager.UpdateCart(idCart, req.body)
        res.status(200).json({message: `carrito con arreglo de productos: ${response}`})
    } catch (error) {
        res.status(500).json({message: `server error ${error}`})
    }
} )
router.put('/:idCart/products/:idProducto', async (req,res) => {
    const {idCart, idProducto} = req.params
    console.log(req.body);
   /*  const quantity = req.body */
    try {
        const response = await cartManager.updateQuantity(idCart,idProducto, req.body)
        res.status(200).json({message: `cantidad de productos actualizada with success ${response}`})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error });
    }
})
router.post('/:idCart/product/:idProducto', async (req,res) => {
    const {idCart, idProducto} = req.params;
    try {
        const cart = await cartManager.addProductToCart(idCart, idProducto)
        if(!cart){
            res.status(404).json({message: 'Product not found with the id provided'})
        }
        res.status(200).json({message:'Producto agregado correctamente con la cantidad correspondiente', cart})
    } catch (error) {
        return res.status(500).json({message: error})
    }
});
router.delete('/:idCart/products/:idProduct', async (req,res) => {
    const {idCart, idProduct} = req.params
    try {
        const response = await cartManager.deleteProductToCart(idCart, idProduct);
        res.status(200).json({message: `Se eliminó el producto ${idProduct} de su carrito ${idCart}` })
    } catch (error) {
        res.status(500).json({
        message: error
        })
    }
router.delete('/idCart', async (req,res) => {
    const {idCart} = req.params
    try {
        const response = await cartManager.deleteCart(idCart)
        res.status(200).json({message: `Se eliminó el cart ${response} with success`})
    } catch (error) {
        res.status(500).json({message:error})
    }
})
})


export default router;