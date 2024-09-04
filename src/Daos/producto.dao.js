
const ticketSchema = require("#M/ticket.model");


const ProductoDao = {
    async findProductoByCode(code) {
      return await ticketSchema.findOne({ code });
    },
  };
  
  module.exports = ProductoDao;