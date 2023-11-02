import { Router } from "express";
import { Producto } from "../dao/ProductManager.js";
import { ProduManager } from "../dao/manager/productmana.js";

const router = Router ();

router.get('/', async (req, res) => {
    const productos = await ProduManager.findAll()
res.render("home", {
    productos: productos,
})
}
)
router.get('/realtimeproducts', async (req,res) => {
    res.render('realTimeProducts')
})
router.get('/chat', async (req,res) => {
    res.render("chat")
})
router.get("/products", async (req, res) => {
    try {
      const products = await ProduManager.findAll({limit:10, page:1, sort:{}, query:{} }).lean()
      const docs = products.payload.docs
      res.render("products",{products: docs});
    } catch (error) {
      return error
    }
  });
  router.get("/carts/:idCart", async(req,res)=>{
    try {
      const {idCart} = req.params
      const cart = await cartsManager.findCartById(idCart)
      const products = cart.products
      res.render("cart",{products})
      console.log(products)
    } catch (error) {
      return error
    }
  })



export default router