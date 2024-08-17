const yup = require("yup");
const { v4: uuidv4 } = require("uuid");

const ticketSchema = require("#M/ticket.model");

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
    let newTicket = new ticketSchema({
      code: uuidv4(),
      purchase_date: req.body.purchase_date,
      amount: req.body.amount,
      email: req.body.email,
      nombre: req.body.nombre,
      type: req.body.type,
      platform: req.body.platform,
      title: req.body.title,
      stock: req.body.stock,
    });

    newTicket
      .save()
      .then((data) => {
        res.status(201).json({ data: data });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ error: `Error al registrar el ticket: ${error}` });
        return;
      });
  } catch (error) {
    res.status(400).send({
      error: `Error creating ticket ${error}`,
    });
  }
};

// Eliminar un ticket
exports.deleteTicket = async (req, res) => {
  try {
    const params = await deleteTicketSchema.validate(req.params);
    ticketSchema
      .deleteOne({
        code: params.code,
      })
      .then((data) => {
        res.status(200).json({
          message: "Ticket eliminado",
          data: data,
        });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ error: `Error al eliminar el ticket: ${error}` });
        return;
      });
  } catch (error) {
    res.status(400).send({
      error: `Error deleting ticket ${error}`,
    });
  }
};

// Actualizar un ticket
exports.updateTicket = async (req, res) => {
  try {
    const { code } = req.params;
    const body = req.body;
    const updateResult = await ticketSchema.updateOne(
      {
        code,
      },
      {
        $set: {
          purchase_date: body.purchase_date,
          amount: body.amount,
          email: body.email,
          nombre: body.nombre,
          type: body.type,
          platform: body.platform,
          title: body.title,
        },
      }
    );
    if (updateResult.modifiedCount > 0) {
      res
        .status(200)
        .json({
          message: "El Producto actualizado correctamente.",
          data: updateResult,
        });
    } else {
      res
        .status(404)
        .json({ message: `Producto no encontrado con el code: ${code}` });
    }
  } catch (error) {
    res.status(400).send({
      error: `Error updating ticket ${error}`,
    });
  }
};

// Me trae todos los que esten en la tabla de tickets con el email del usuario
exports.getTickets = async (req, res) => {
  try {
    await req.body;
    ticketSchema
      .find({
        purchase: req.body.purchase,
      })
      .then((data) => {
        res.status(200).json({ data: data });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ error: `Error al obtener los tickets: ${error}` });
        return;
      });
  } catch (error) {
    res.status(400).send({
      error: `Error getting tickets ${error}`,
    });
  }
};

// Me trae un ticket en especifico por parametros
exports.getOneTicket = async (req, res) => {
  try {
    await req.body;
    ticketSchema
      .findOne({
        code: req.params.code,
      })
      .then((data) => {
        res.status(200).json({ data: data });
      })
      .catch((error) => {
        res.status(400).json({ error: `Error al obtener el ticket: ${error}` });
        return;
      });
  } catch (error) {
    res.status(400).send({
      error: `Error getting ticket ${error}`,
    });
  }
};
