const TicketDao = require("#DAO/ticktes.dao");

const TicketService = {
  async createTicket(ticketData) {
    const createdTicket = await TicketDao.createTicket(ticketData);
    return createdTicket;
  },

  async deleteTicket(code) {
    const deletedTicket = await TicketDao.deleteTicketByCode(code);
    return deletedTicket;
  },

  async updateTicket(code, updateData) {
    const updatedTicket = await TicketDao.updateTicketByCode(code, updateData);
    return updatedTicket;
  },

  async getTicketsByPurchase(purchase) {
    const tickets = await TicketDao.getTicketsByPurchase(purchase);
    return tickets;
  },

  async getTicketByCode(code) {
    const ticket = await TicketDao.getTicketByCode(code);
    return ticket;
  },
};

module.exports = TicketService;
