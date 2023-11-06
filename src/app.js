import express from 'express'
import cartRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import {__dirname } from './utils.js'
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { Producto } from './dao/FS/ProductManager.js';
import { cartManager } from './dao/manager/cartsmana.js';
import { ProduManager } from './dao/manager/productmana.js';
import { chatMana } from './dao/manager/chatmana.js';
//db
import './db/configDB.js'

const PORT = 8080;


const app = express()
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.engine("handlebars", engine())
app.set("views",  __dirname+"/views");
app.set("view engine","handlebars");
app.use(express.static(__dirname+"/public"))

//req ---> params, query, body

app.use("/api/productos", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/views", viewsRouter);


const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
})

const socketServer = new Server (httpServer) 

socketServer.on('connection', async (socket) => {
    console.log('cliente conectado');
//CHAT
    socket.on("newUser", (usuario) => {
        socket.broadcast.emit("userConnect", usuario )
    })
    socket.on("message", async (info) => {
       await chatMana.createOne(info)
        const message = await chatMana.findAll()
       socketServer.emit("sendMessage", message)
    }) 
    socket.on("showProducts", async() => {
        const products = await ProduManager.findAll({limit:10, page:1, sort:{}, query:{} })
        socketServer.emit("sendProducts", products);
      });
})
    //PRODUCTOS
/* 
    const products= await Producto.getProduct()
    socketServer.emit('products', products)

    socket.on('addProduct', async (producto) => {
        const product= await Producto.addproduct(producto);
        const update = await Producto.updateProduct(product)
        socketServer.emit('productUpdate', update)
    })
    socket.on('deleteProduct', async (productId) => {
            const producto = await Producto.deleteProduct(+productId);
            socketServer.emit('productDelete', producto);
    socket.on('disconnect', () => {
    console.log('Cliente desconectado');
})
    })}) */