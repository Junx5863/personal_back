
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoGamesPath = path.join(__dirname, "../../json/games.json");

let videoGamesData;

try {
  const data = fs.readFileSync(videoGamesPath, "utf8");
  videoGamesData = JSON.parse(data);
} catch (err) {
  console.error("Error reading video games data:", err);
  videoGamesData = { video_games: [] };
}

const getUsers = async (req, res) => {
  try {
    res.send(jsonData);
  } catch (error) {
    res.status(400).send({
      error: "Error getting users",
    });
  }
};

const addVideoGame = async (req, res) => {
  try {
    const {
      title,
      description,
      platform,
      status,
      stock,
      price,
      release_date,
      genre,
    } = req.body;

    // Crear un nuevo videojuego con un ID único
    const newVideoGame = {
      id:
        videoGamesData.video_games.length > 0
          ? videoGamesData.video_games[videoGamesData.video_games.length - 1]
              .id + 1
          : 1,
      title,
      platform,
      price,
      release_date,
      genre,
      description,
      status,
      stock,
    };

    //Validar si el videojuego ya existe
    if (
      videoGamesData.video_games.find(
        (game) => game.title === newVideoGame.title
      )
    ) {
      return res.status(400).send({
        error: "Video game already exists",
      });
    } else {
      // Agregar el nuevo videojuego a la lista
      videoGamesData.video_games.push(newVideoGame);

      // Guardar los cambios en el archivo JSON
      fs.writeFileSync(videoGamesPath, JSON.stringify(videoGamesData, null, 2));

      res.status(201).send({
        message: "Video game added",
        videoGame: newVideoGame,
      });
    }
  } catch (error) {
    res.status(400).send({
      error: `Error adding video game ${error}`,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    //segun el archivo json importado se debe buscar el usuario por el id
    const user = videoGamesData.video_games.find(
      (game) => game.id === parseInt(id)
    );
    if (!user) {
      res.status(404).send({
        error: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    res.status(400).send({
      error: "Error getting user by user id",
    });
  }
};

const updateVideoGame = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      platform,
      status,
      stock,
      price,
      release_date,
      genre,
    } = req.body;

    // Encontrar el índice del videojuego a actualizar
    const videoGameIndex = videoGamesData.video_games.findIndex(
      (game) => game.id === parseInt(id)
    );
    if (videoGameIndex === -1) {
      return res.status(404).send({
        error: "Video game not found",
      });
    }

    // Actualizar el videojuego
    const updatedVideoGame = {
      ...videoGamesData.video_games[videoGameIndex],
      title,
      platform,
      price,
      release_date,
      genre,
      description,
      status,
      stock,
    };
    videoGamesData.video_games[videoGameIndex] = updatedVideoGame;

    // Guardar los cambios en el archivo JSON
    fs.writeFileSync(videoGamesPath, JSON.stringify(videoGamesData, null, 2));

    res.send({
      message: "Video game updated",
      videoGame: updatedVideoGame,
    });
  } catch (error) {
    res.status(400).send({
      error: "Error updating video game",
    });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    // Encontrar el índice del videojuego a eliminar
    const videoGameIndex = videoGamesData.video_games.findIndex(
      (game) => game.id === parseInt(id)
    );
    // eliminar el videojuego de la lista
    if (!videoGamesData.video_games[videoGameIndex]) {
      res.status(404).send({
        error: "Game not found",
      });
    } else {
      videoGamesData.video_games.splice(videoGameIndex, 1);
      fs.writeFileSync(videoGamesPath, JSON.stringify(videoGamesData, null, 2));
      res.send({
        message: "Game deleted",
      });
    }
  } catch (error) {
    res.status(400).send({
      error: "Error deleting user",
    });
  }
};

export const userController = {
  addVideoGame,
  getUsers,
  getById,
  updateVideoGame,
  deleteGame,
};
