const yup = require("yup");
const { v4: uuidv4 } = require("uuid");

const carritoSchema = require("#M/carrito.model");
const ticketSchema = require("#M/ticket.model");
const Factura = require("#M/factura.model");

const CarritoService = require("#S/carrito.services");

const createCarritoSchema = yup.object().shape({
  nombre_cliente: yup.string().required("El nombre del cliente es requerido"),
  email: yup.string().required("El email del cliente es requerido"),
});

const deleteCarritoSchema = yup.object().shape({
  code: yup.string().required("El carrito es requerido"),
});

const addProductSchema = yup.object().shape({
  code_carrito: yup.string().required("El carrito es requerido"),
});

const add_productParamsSchema = yup.object().shape({
  code: yup.string().required("El codigo del carrito es requerido"),
});

exports.createCarrito = async (req, res) => {
  try {
    await createCarritoSchema.validate(req.body);

    const carritoData = {
      code: uuidv4(),
      nombre_cliente: req.body.nombre_cliente,
      email: req.body.email,
      date: req.body.date,
    };

    const createdCarrito = await CarritoService.createCarrito(carritoData); // Call the service

    res.status(201).json({ data: createdCarrito }); // Return the created carrito
  } catch (error) {
    res.status(400).send({
      error: `Error creating carrito: ${error.message}`,
    });
  }
};

exports.deleteCarrito = async (req, res) => {
  try {
    const params = await deleteCarritoSchema.validate(req.params);

    const deletedCarrito = await CarritoService.deleteCarrito(params.code); // Call the service

    res.status(200).json({
      message: "Carrito eliminado",
      data: deletedCarrito,
    });
  } catch (error) {
    res.status(400).send({
      error: `Error deleting carrito: ${error.message}`,
    });
  }
};

// agregar un producto al carrito

exports.addProduct = async (req, res) => {
  try {
    //id del Carrito
    const params = await add_productParamsSchema.validate(req.params);

    if (!params) {
      res.status(400).json({ error: "El carrito es requerido" });
      return;
    }

    let carrito = await carritoSchema
      .findOne({ code: params.code })
      .populate("products");

    if (!carrito) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const { producto_id } = req.body;
    if (!producto_id) {
      return res.status(400).json({ error: "El producto es requerido" });
    }

    const producto = await ticketSchema.findOne({ code: producto_id });
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (!carrito.products.some((p) => p._id.equals(producto._id))) {
      carrito.products.push({ product_code: producto._id });
      await carrito.save();
    }

    // Volver a popular el carrito actualizado para incluir los detalles completos de los productospa
    carrito = await carrito.populate({
      path: "products.product_code",
      select: "-__v",
    });

    res.status(200).json({
      message: "Producto agregado al carrito con éxito",
      data: carrito,
    });
  } catch (error) {
    res.status(400).send({
      error: `Error adding product to carrito ${error}`,
    });
  }
};

exports.getCarrito = async (req, res) => {
  try {
    const { code } = req.params;

    const carrito = await CarritoService.getCarritoByCode(code);

    res.status(200).json({
      data: carrito,
    });
  } catch (error) {
    res.status(400).send({
      error: `Error getting carrito: ${error.message}`,
    });
  }
};

exports.paymentCarrito = async (req, res) => {
  try {
    const { carrito_code } = req.body;

    // Buscar el carrito
    const carrito = await carritoSchema
      .findOne({ code: carrito_code })
      .populate({
        path: "products.product_code",
      });

    if (!carrito) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }


    // Calcular el total a pagar
    let totalPayment = 0;

    carrito.products.map((data) => {
      totalPayment += data.product_code.amount;
    });


    // Crear la factura
    const factura = new Factura({
      code: uuidv4(),
      nombre_cliente: carrito.nombre_cliente,
      email: carrito.email,
      products: carrito.products.map((p) => ({ product_code: p.product_code._id })),
      totalPayment,
    });

    await factura.save();

    res.status(201).json({
      message: "Factura generada con éxito",
      data: factura,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error al generar la factura: ${error.message}`,
    });
  }
};
