import express from 'express'
import cartRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import {__dirname } from './utils.js'
import { engine } from 'express-handlebars';

const app = express()

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.engine("handlebars", engine())
app.set("views",  __dirname + "/views");
app.set("view engine","handlebars");
app.use(express.static(__dirname+"public"))

app.get('/api/views', (req, res) => {
    res.render('home', {name :'Lucas'})
})
//req ---> params, query, body

app.use("/api/productos", productsRouter);
app.use("/api/carts", cartRouter);
/* app.use("/api/views", viewsRouter); */

app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
})