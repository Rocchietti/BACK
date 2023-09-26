import { Router } from 'express';
import { Producto } from '../ProductManager.js';

const router = Router(); 


/* router.get('/', async (req,res) => {
    try {
        const products = await Producto.getProduct(req.query)
        res.status(200).json({message:'lista de productos',products})
    } catch (error) {
        res.status(500).json({message: 'Error Server'})
    }
});
router.get('/:pid', async (req,res) => {
    console.log(req.params);
    const {pid} = req.params
    try {
        const idProducto = await Producto.getProductById(+pid)
        if(!idProducto){
            res.status(404).json({message: 'Product not found with the id provided'})
        }
        res.status(200).json({message:'Producto por ID', idProducto})
    } catch (error) {
      
    }
}); */
router.post('/', async(req,res)=> {
    const [products] = req.body
    console.log(req.body);
    if(!title || !description || !price){
        return res.status(400).json({message: 'faltan datos'})
    }
    try {
        const update = await Producto.addproduct(req.body)
        res.status(200).json({message: 'Producto añadido', products:update})
    } catch (error) {
        return res.status(500).json('Ha ocurrido un error')
    }
});
router.get('/:cartId', async (req,res) => {
    const {idProducto} = req.params
    try {
        const response = await Producto.deleteProduct(+idProducto)
        if(!response){
            res.status(404).json({message: 'Product not found with the id provided'})
        }
        res.status(200).json({message:'Producto eliminado', response})
    } catch (error) {
        app.status(500).json({message: 'No se pudo comunicar con el servidor'})
    }
});
router.post('/:cartId/product/:productId', async (req,res) => {
    const {idProducto} = req.params;
    try {
        const response = await Producto.updateProduct(+idProducto, req.body)
        if(!response){
            res.status(404).json({message: 'Product not found with the id provided'})
        }
        res.status(200).json({message:'Producto actualizado', response})
    } catch (error) {
        
    }
});


export default router;