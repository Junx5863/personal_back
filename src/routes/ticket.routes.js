const { Router } = require("express");
const ticketController = require("#C/ticket.controller");

const {
  authenticate,
  autorisations,
  autorisationsClient,
} = require("#MW/auth.middleware");

const router = Router();

//Admin
router.post(
  "/create_product",
  authenticate,
  autorisations,
  ticketController.createTicket
);
router.delete(
  "/delete_product/:code",
  authenticate,
  autorisations,
  ticketController.deleteTicket
);

router.put(
  "/update_product/:code",
  authenticate,
  autorisations,
  ticketController.updateTicket
);

//Cliente
router.get("/get_tickets", authenticate, ticketController.getTickets);

router.get("/get_One_Ticket/:id", authenticate, ticketController.getOneTicket);

module.exports = router;
