import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoGamesPath = path.join(__dirname, "../../../json/games.json");

let videoGamesData;

try {
  const data = fs.readFileSync(videoGamesPath, "utf8");
  videoGamesData = JSON.parse(data);
} catch (err) {
  console.error("Error reading video games data:", err);
  videoGamesData = { video_games: [] };
}

const getListGames = async (req, res) => {
  try {
    res.render("index", { title: "Hello World", videoGamesPath: videoGamesData.video_games });
  } catch (error) {
    res.status(400).send({
      error: "Error getting users",
    });
  }
};



export const gamesController = {
    getListGames,
  };