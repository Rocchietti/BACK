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
    try {
        const response = await cartManager.UpdateCart(idCart)
    } catch (error) {
        
    }
} )
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
})


export default router;