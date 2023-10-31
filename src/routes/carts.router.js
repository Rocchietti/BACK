import { Router, json } from 'express';
import { cartManager } from '../dao/manager/cartsmana.js';


const router = Router(); 

router.get('/', async (req, res) => {
    const {idCart} = req.params
    try {
        const productsToCart = await cartManager.findCartById(idCart)
        res.status(200).json({message: 'Carrito:', productsToCart})
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
 router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const carro= await cartManager.findById(cid)
        if(!carro){
            res.status(400).json({message: 'No hay lista de productos'})
        }
        res.status(200).json({message: 'Carrito per ID', carro})
    } catch (error) {
        return res.status(500).json({message: error})
    }
}) 
router.post('/:idCart/product/:idProducto', async (req,res) => {
    const {idCart, idProducto} = req.params;
    try {
        const response = await cartManager.addProductToCart(idCart, idProducto)
        if(!response){
            res.status(404).json({message: 'Product not found with the id provided'})
        }
        res.status(200).json({message:'Producto agregado correctamente con la cantidad correspondiente', response})
    } catch (error) {
        return res.status(500).json({message: error})
    }
});


export default router;