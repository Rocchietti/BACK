import { Router } from "express";
import { Producto } from "../dao/ProductManager.js";

const router = Router ();

router.get('/', async (req, res) => {
    const productos = await Producto.getProduct(req.query)
res.render("home", {
    productos: productos,
})
}
)
router.get('/realtimeproducts', async (req,res) => {
    res.render('realTimeProducts')
})
/* router.get('/chat', async (req,res) => {
    res.render("chat")
})
 */


export default router