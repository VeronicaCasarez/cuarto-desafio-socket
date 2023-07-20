import fs from "fs";

class CartManager {
//   static productId = 1;

  constructor(path) {
    this.carts = [];
    this.path = path;
    this.readCounterFromFile();
    
  }
 
 //mostrar el carrito
  async getCart(newCart) {
    try {
      const carts = await this.readDataFromFile();
      return carts; // Devolver los productos encontrados
    } catch (err) {
      console.log(err);
      return []; // Devolver un arreglo vacío en caso de error
    }
  }

  //crear un carrito
  async addCart(newCart) {
    try {
      this.carts.push(newCart);
      await this.writeDataToFile(this.carts);
      await this.writeCounterToFile();
      console.log("Carrito agregado correctamente");
    } catch (err) {
      console.log(err);
    }
  }

//   async getCartById(cartId) {
//     try {
//       const carts = await this.readDataFromFile();
//       const cartFind = carts.find((cart) => cart.id === cartId);
//       if (!cartFind) {
//         console.log("Carrito no encontrado");
//         return null; // Devolver null si el carrito no se encuentra
//       } else {
//         return cartFind; // Devolver el  carrito encontrado
//       }
//     } catch (err) {
//       console.log(err);
//       return null; // Devolver null en caso de error
//     }
//   }

  

//   async addProductInCart(cartId, productId) {
//     try{
//         const cartId = req.params.cid;
//     const productId = req.params.pid;
   

//     const cartsData = await readDataFromFile();
//     const cart = cartsData.find((cart) => cart.id === cartId);

//     if (!cart) {
//       res.status(404).json({ error: "Carrito no encontrado" });
//       return;
//     }

//     const existingProduct = cart.products.find((product) => product.id === productId);

//     if (existingProduct) {
//       existingProduct.quantity += quantity;
//     } else {
//       cart.products.push({ id: productId, quantity });
//     }

//     await writeDataToFile(cartsData);

//     res.json({ message: "Producto agregado al carrito correctamente" });
//   } catch (err) {
//     res.status(500).json({ error: "Error al agregar el producto al carrito" });
//   }
//   }
///////////////////////reutilizables///////////////
async readCounterFromFile() {
    try {
      const counterData = fs.promises.readFileSync("./cartscounter.json", "utf-8");
      const { cartId } = JSON.parse(counterData);
      CartManager.cartId = cartId;
    } catch (err) {
      console.log("No se pudo leer el contador de ID. Se utilizará el valor inicial de 1.");
    }
  }

  async writeDataToFile(data) {
    console.log(data)
    try {
      const existingData = await this.readDataFromFile(); 
      const updatedData = [...existingData, ...data]; 
  
      await fs.promises.writeFile(this.path, JSON.stringify(updatedData), "utf-8"); 
    } catch (err) {
      console.log(err);
    }
  }


  async readDataFromFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async writeCounterToFile() {
    try {
      const counterData = JSON.stringify({ cartId: CartManager.cartId });
      fs.promises.writeFile("../cartscounter.json", counterData, "utf-8");
    } catch (err) {
      console.log(err);
    }
  }
}

////////////////////

export default CartManager;



// async getProductByCode(code) {
//   try {
//     const products = await this.readDataFromFile();
//     const product = products.find((product) => product.code === code);
//     return product || null;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }
// }


