const express = require("express");
const routerApi = require("#R/_index");
const databse = require("#DB/database");
const cookieParser = require('cookie-parser');
const swaggerSetup = require('#U/swagger');
const config = require("../src/config/config");

const dotenv = require("dotenv");

dotenv.config();

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

app.use(express.json());
app.use(cookieParser());


databse.mongoConnect();


routerApi(app);

swaggerSetup(app);



app.get("/", async (req, res) => {
  res.send("ok-s");
});

app.listen(config.port_back, () => {
  console.log(`Server running on port ${config.port_back}`);
});
