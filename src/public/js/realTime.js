const socketClient = io();

const form = document.getElementById("form");
const addTitle = document.getElementById("title");
const addDescription= document.getElementById("description");   
const addPrice= document.getElementById("price");
const addCode= document.getElementById("code");
const addStock= document.getElementById("stock");
const addCategory= document.getElementById("categoria");
const formDelete = document.getElementById("formDelete");
const IdDelete = document.getElementById("idDelete");
const TitleDelete = document.getElementById("titleDelete");

socketClient.on("products", (products) => {
    listaDeProductosActualizados(products);
  });
const listaDeProductosActualizados = (products) => {
    let divRealTimeProduct = document.getElementById("divRealTimeProduct");
    let html = "";
    products.forEach((product) => {
      html += ` 
        <p>id: ${product.id}</p>
        <h3>titulo: ${product.title}</h3>
        <p>descripcion: ${product.description}</p>
        <p>precio: ${product.price}</p>
        <p>codigo: ${product.code}</p>
        <p>stock: ${product.stock}</p>
        <hr>
        `;
    divRealTimeProduct.innerHTML = html;
});
};
  form.onsubmit = (e)=>{
    e.preventDefault();
    const title = addTitle.value;
    const description = addDescription.value;
    const price = addPrice.value;
    const code = addCode.value;
    const stock = addStock.value;
    const category = addCategory.value;

    socketClient.emit("addProduct", {title,description,price,code,stock,category})

    socketClient.on("productUpdate", (productosActualizados) => {
        listaDeProductosActualizados(productosActualizados);
      });
}
formDelete.onsubmit = (e)=>{
    e.preventDefault();
    const idDelete = IdDelete.value;
    socketClient.emit("deleteProduct", idDelete);
  };
  socketClient.on("productDelete", (products) => {
    listaDeProductosActualizados(products);
  });
  