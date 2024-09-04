const carritoSchema = require("#M/carrito.model");

const CarritoDao = {
  async createCarritoDao(carritoData) {
    const newCarrito = new carritoSchema(carritoData);
    return await newCarrito.save();
  },

  async deleteCarritoByCode(code) {
    return await carritoSchema.deleteOne({ code });
  },

  async findCarritoByCode(code) {
    return await carritoSchema.findOne({ code }).populate('products.product_code');
  },

  async updateCarrito(carrito) {
    return await carrito.save();
  },

  async getCarritoByCode(code) {
    return await carritoSchema.findOne({ code }).populate({
      path: "products.product_code",
      select: "-__v",
    });
  },
};

module.exports = CarritoDao;
