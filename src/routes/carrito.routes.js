const { Router } = require("express");
const carritoController = require("#C/carrito.controller");

const {
  authenticate,
  autorisations,
  autorisationsClient,
} = require("#MW/auth.middleware");


const router = Router();

router.post('/create_carrito', authenticate, autorisationsClient, carritoController.createCarrito);
router.delete('/delete_carrito/:code', authenticate, autorisationsClient, carritoController.deleteCarrito);
router.post('/add_product/:code', authenticate, autorisationsClient, carritoController.addProduct);
router.get('/get_carrito/:code', authenticate, autorisationsClient, carritoController.getCarrito);

router.get('/factura_electronica', authenticate, carritoController.paymentCarrito);
module.exports = router;