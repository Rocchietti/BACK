import { Router } from "express";
import { ProduManager } from "../dao/manager/productmana.js";
import { cartManager } from "../dao/manager/cartsmana.js";


const router = Router ();

router.get("/home", async (req, res) => {
  try {
      const products = await ProduManager.findAll(req.query);
      const productsFinal = products.info.results;
      const clonedProducts = productsFinal.map(product => Object.assign({}, product._doc));
      const result = clonedProducts;
      const paginate = products.info.pages;
      const sort = req.query.orders;
      console.log(result);
      res.render("home",  {products: result, paginate: paginate, sort: sort, style:"product"} );
  } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
  }
});
router.get('/realtimeproducts', async (req,res) => {
    res.render('realTimeProducts')
})
router.get('/chat', async (req,res) => {
    res.render("chat")
})
router.get('/carts/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
      const cart = await cartManager.findById(cid);

      if (!cart) {
          return res.status(404).send('Carrito no encontrado');
      }
      const cartProducts = cart.products.map(doc => doc.toObject());

      
      console.log(cartProducts);
      res.render('carts', { products:cartProducts, style:"product" });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
  }
});



export default router