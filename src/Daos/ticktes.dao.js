const ticketSchema = require("#M/ticket.model");

const TicketDao = {
  async createTicket(ticketData) {
    const newTicket = new ticketSchema(ticketData);
    return await newTicket.save();
  },

  async deleteTicketByCode(code) {
    return await ticketSchema.deleteOne({ code });
  },

  async updateTicketByCode(code, updateData) {
    return await ticketSchema.updateOne({ code }, updateData);
  },

  async getTicketsByPurchase(purchase) {
    return await ticketSchema.find({ purchase });
  },

  async getTicketByCode(code) {
    return await ticketSchema.findOne({ code });
  },
};

module.exports = TicketDao;
