

const validateCarrito = (req, res, next) => {
    const { id, products } = req.body;
  
    // Validación del id
    if (!id || typeof id !== 'string') {
      return res
        .status(400)
        .json({ error: 'El id es obligatorio y debe ser una cadena de texto' });
    }
  
    // Validación del array de productos
    if (!Array.isArray(products)) {
      return res
        .status(400)
        .json({ error: 'El campo products debe ser un array' });
    }
  
    // Validaciones adicionales para los productos
    for (const product of products) {
      if (!product.title || typeof product.title !== 'string') {
        return res
          .status(400)
          .json({
            error: 'Cada producto debe tener un nombre de tipo cadena de texto',
          });
      }
    }
  
    next();
  };

const validateGetById = (req, res, next) => {
    const { id } = req.params;
  
    if (!id || typeof id !== 'string') {
      return res
        .status(400)
        .json({ error: 'El id es obligatorio y debe ser una cadena de texto' });
    }
  
    next();
  };

export { validateCarrito, validateGetById };