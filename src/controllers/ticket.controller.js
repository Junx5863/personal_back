const yup = require("yup");
const { v4: uuidv4 } = require("uuid");

const ticketSchema = require("#M/ticket.model");

const TicketService = require("#S/ticket.services");


const createTicketSchema = yup.object().shape({
  amount: yup.number().required("El monto es requerido"),
  email: yup.string().required("El emial del usuario es requerido"),
  nombre: yup.string().required("El nombre del usuario es requerido"),
  type: yup.string().required("El tipo de ticket es requerido"),
  platform: yup.string().required("La plataforma es requerida"),
  title: yup.string().required("El titulo del producto es requerido"),
  stock: yup.number().required("El stock es requerido"),
});

const deleteTicketSchema = yup.object().shape({
  code: yup.string().required("La compra es requerida"),
});

exports.createTicket = async (req, res) => {
  try {
    await createTicketSchema.validate(req.body);

    const ticketData = {
      code: uuidv4(),
      purchase_date: req.body.purchase_date,
      amount: req.body.amount,
      email: req.body.email,
      nombre: req.body.nombre,
      type: req.body.type,
      platform: req.body.platform,
      title: req.body.title,
      stock: req.body.stock,
    };

    const createdTicket = await TicketService.createTicket(ticketData); 

    res.status(201).json({ data: createdTicket }); 
  } catch (error) {
    res.status(400).send({
      error: `Error creating ticket: ${error.message}`,
    });
  }
};

// Eliminar un ticket
exports.deleteTicket = async (req, res) => {
  try {
    const params = await deleteTicketSchema.validate(req.params);

    const deletedTicket = await TicketService.deleteTicket(params.code);
    res.status(200).json({
      message: "Ticket eliminado",
      data: deletedTicket,
    });
  } catch (error) {
    res.status(400).send({
      error: `Error deleting ticket: ${error.message}`,
    });
  }
};

// Actualizar un ticket
exports.updateTicket = async (req, res) => {
  try {
    const { code } = req.params;
    const body = req.body;

    const updatedTicket = await TicketService.updateTicket(code, body); 

    if (updatedTicket.modifiedCount > 0) {
      res
        .status(200)
        .json({
          message: "El Ticket actualizado correctamente.",
          data: updatedTicket,
        });
    } else {
      res
        .status(404)
        .json({ message: `Ticket no encontrado con el code: ${code}` });
    }
  } catch (error) {
    res.status(400).send({
      error: `Error updating ticket ${error.message}`,
    });
  }
};

// Me trae todos los que esten en la tabla de tickets con el email del usuario
exports.getTickets = async (req, res) => {
  try {
    const { purchase } = req.body; 

    const tickets = await TicketService.getTicketsByPurchase(purchase); 

    res.status(200).json({
      data: tickets,
    });
  } catch (error) {
    res.status(400).send({
      error: `Error getting tickets: ${error.message}`,
    });
  }
};

// Me trae un ticket en especifico por parametros
exports.getOneTicket = async (req, res) => {
  try {
    const { code } = req.params; 

    const ticket = await TicketService.getTicketByCode(code); 

    res.status(200).json({
      data: ticket,
    });
  } catch (error) {
    res.status(400).send({
      error: `Error getting ticket: ${error.message}`,
    });
  }
};
