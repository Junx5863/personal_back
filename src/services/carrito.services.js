const ProductoDao = require("#DAO/producto.dao");
const CarritoDao = require("#SRC/Daos/cart.dao");

const CarritoService = {
  async createCarrito(carritoData) {
    const createdCarrito = await CarritoDao.createCarritoDao(carritoData);
    return createdCarrito;
  },

  async deleteCarrito(code) {
    const deletedCarrito = await CarritoDao.deleteCarritoByCode(code);
    return deletedCarrito;
  },
  async addProductToCarrito(carritoCode, productoId) {
    const carrito = await CarritoDataDao.findCarritoByCode(carritoCode);
    if (!carrito) {
      throw new Error('Carrito no encontrado');
    }

    const producto = await ProductoDao.findProductoByCode(productoId);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    if (!carrito.products.some((p) => p._id.equals(producto._id))) {
      carrito.products.push({ product_code: producto._id });
      await CarritoDao.updateCarrito(carrito);
    }

    return carrito;
  },

  async getCarritoByCode(code) {
    const carrito = await CarritoDao.getCarritoByCode(code);
    return carrito;
  },
};

module.exports = CarritoService;
