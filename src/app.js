import express from "express";
import routerApi from "../src/routes/_index.js";

console.log(`
  ██████ ▄▄▄█████▓ ▄▄▄       ██▀███  ▄▄▄█████▓   ▓█████▄ ▓█████ ██▒   █▓
▒██    ▒ ▓  ██▒ ▓▒▒████▄    ▓██ ▒ ██▒▓  ██▒ ▓▒   ▒██▀ ██▌▓█   ▀▓██░   █▒
░ ▓██▄   ▒ ▓██░ ▒░▒██  ▀█▄  ▓██ ░▄█ ▒▒ ▓██░ ▒░   ░██   █▌▒███   ▓██  █▒░
  ▒   ██▒░ ▓██▓ ░ ░██▄▄▄▄██ ▒██▀▀█▄  ░ ▓██▓ ░    ░▓█▄   ▌▒▓█  ▄  ▒██ █░░
▒██████▒▒  ▒██▒ ░  ▓█   ▓██▒░██▓ ▒██▒  ▒██▒ ░    ░▒████▓ ░▒████▒  ▒▀█░  
▒ ▒▓▒ ▒ ░  ▒ ░░    ▒▒   ▓▒█░░ ▒▓ ░▒▓░  ▒ ░░       ▒▒▓  ▒ ░░ ▒░ ░  ░ ▐░  
░ ░▒  ░ ░    ░      ▒   ▒▒ ░  ░▒ ░ ▒░    ░        ░ ▒  ▒  ░ ░  ░  ░ ░░  
░  ░  ░    ░        ░   ▒     ░░   ░   ░          ░ ░  ░    ░       ░░  
      ░                 ░  ░   ░                    ░       ░  ░     ░  
                                                  ░                 ░   
 ` );



const app = express();
const PORT = 3000;

app.use(express.json());



routerApi(app);

app.get("/", async (req, res) => {
  res.send("ok-s");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
