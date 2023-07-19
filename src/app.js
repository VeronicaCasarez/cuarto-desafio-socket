import { engine } from "express-handlebars";
import express from "express";
import { __filename, __dirname } from './utils.js';
import viewsRoutes from "./routes/views.router.js";
import viewsRealTime from "./routes/viewsrealTime.router.js";
import { Server } from "socket.io";
import { createServer } from "http";

import { guardarProducto } from "./services/productUtils.js";
import fs from "fs";

import productos from "./products.json" assert {type : "json"}

const app = express();
const httpServer = createServer(app);

const PORT = 3003;

// Configurar el motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', `${__dirname}/views`);

// Configurar el directorio estático para archivos públicos
app.use(express.static("public"));

// Configurar el middleware para manejar las solicitudes JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar las rutas para las vistas
app.use("/", viewsRoutes);
app.use("/realtimeproducts", viewsRealTime);



// Configuración del lado del servidor
const socketServer = new Server(httpServer);

// Configurar el evento de conexión de Socket.IO
socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Manejar eventos personalizados
  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);

    // Enviar una respuesta al cliente
    socket.emit('respuesta', 'Mensaje recibido correctamente');
  });

   // Escuchar evento 'agregarProducto' y emitir 'nuevoProductoAgregado'
   socket.on("agregarProducto", (newProduct) => {
    console.log("Nuevo producto recibido backend:", newProduct);
    guardarProducto(newProduct);
    // Agregar el nuevo producto a la lista de productos
    socket.emit("nuevoProductoAgregado", newProduct);
  });

  socket.on("eliminarProducto",(productCode)=>{
    let indexProducto = productos.findIndex((producto)=>producto.code === productCode)
    productos.splice(indexProducto,1)
    fs.writeFileSync("productos.json",JSON.stringify(productos))
})

// socket.emit("update-products",productos)

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

//Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
