import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const carritoPath = path.join(__dirname, "../../json/carrito.json");

let carritoData = [];

try {
  const data = fs.readFileSync(carritoPath);
  carritoData = JSON.parse(data);
} catch (error) {
  carritoData = [];
}

const createCarritoPost = async (req, res) => {
  try {
    const { id, products } = req.body;

    if (carritoData.some((carrito) => carrito.id === id)) {
      return res.status(400).json({ error: "El carrito ya existe" });
    }

    const newCarrito = {
      id,
      products,
    };

    carritoData.push(newCarrito);

    // se guarda el array de carritos en el archivo json
    try {
      fs.writeFileSync(carritoPath, JSON.stringify(carritoData, null, 2));
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error guardando carrito: ${error.message}` });
    }

    res
      .status(200)
      .json({ message: "Datos recibidos correctamente", id, products });
  } catch (error) {
    res.status(400).send({
      error: `Error creating carrito ${error}`,
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = carritoData.find((carrito) => carrito.id === id);
    if (!user) {
      return res.status(404).send({
        error: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    return res.status(400).send({
      error: `Error getting car ${error}`,
    });
  }
};

const addProductToCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const { product } = req.body;

    // Validar que el producto tiene un título
    console.log(product);
    if (!product || typeof product.title !== 'string') {
      return res.status(400).json({ error: 'El producto debe tener un título de tipo cadena' });
    }

    // validar que el productos ya existe
    const productExists = carritoData.some((carrito) => carrito.products.some((p) => p.title === product.title));
    if (productExists) {
      return res.status(400).json({ error: 'El producto ya existe en el carrito' });
    }


    // Encontrar el carrito
    const carritoIndex = carritoData.findIndex((carrito) => carrito.id === id);
    if (carritoIndex === -1) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Agregar el nuevo producto al array de productos del carrito
    carritoData[carritoIndex].products.push(product);

    // Guardar los datos actualizados en el archivo JSON
    try {
      fs.writeFileSync(carritoPath, JSON.stringify(carritoData, null, 2));
    } catch (error) {
      return res.status(500).json({ error: `Error guardando el carrito: ${error.message}` });
    }

    res.status(200).json({ message: 'Producto agregado correctamente', carrito: carritoData[carritoIndex] });
  } catch (error) {
    res.status(500).send({ error: `Error agregando producto al carrito: ${error.message}` });
  }
};

export const carritoController = {
  createCarritoPost,
  getCarById,
  addProductToCarrito,
};
