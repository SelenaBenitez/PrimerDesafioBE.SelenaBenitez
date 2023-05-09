class ProductManager {
    constructor() {
      this.products = [];
      this.lastId = 0;
    }
  
    addProduct(product) {
      // Validar que no se repita el campo “code” y que todos los campos sean obligatorios
      const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"];
      const isValidProduct = requiredFields.every((field) => product[field]);
      const isUniqueCode = !this.products.some((p) => p.code === product.code);
      if (!isValidProduct || !isUniqueCode) {
        throw new Error("Invalid product");
      }
  
      // Agregar producto con id autoincrementable
      const newProduct = { ...product, id: ++this.lastId };
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    }
  }
  
  const productManager = new ProductManager();
  
  console.log(productManager.getProducts()); // []
  
  const product1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };
  
  const addedProduct1 = productManager.addProduct(product1);
  console.log(addedProduct1); // { title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25, id: 1 }
  
  console.log(productManager.getProducts()); // [ { title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25, id: 1 } ]
  
  const product2 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };
  
  try {
    const addedProduct2 = productManager.addProduct(product2);
    console.log(addedProduct2);
  } catch (error) {
    console.error(error); // Error: Invalid product
  }
  
  const productId = 1;
  const productById = productManager.getProductById(productId);
  console.log(productById); // { title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25, id: 1 }
  
  try {
    const nonExistingProductId = 2;
    const productByNonExistingId = productManager.getProductById(nonExistingProductId);
    console.log(productByNonExistingId);
  } catch (error) {
    console.error(error); // Error: Product not found
  }