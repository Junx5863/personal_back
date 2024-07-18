import { Router } from "express";
import { carritoController } from "../controllers/carrito.controller.js";
import {
  validateCarrito,
  validateGetById,
} from ".././middlewares/carrito.middleware.js";

const router = Router();

router.get("/:id", validateGetById, carritoController.getCarById);
router.post(
  "/add_new_content",
  validateCarrito,
  carritoController.createCarritoPost
);
router.post('/:id', carritoController.addProductToCarrito
);

export default router;
