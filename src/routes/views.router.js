import { Router } from "express";
import { Producto } from "../ProductManager.js";

const router = Router ()

router.get('/', (req, res) => {
res.render("home", {layout: true})
}
)
export default router