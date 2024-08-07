import express from "express";
import routerApi from "../src/routes/_index.js";
import exphbs from "express-handlebars";


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
 `);

const app = express();
const PORT = 3000;

app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("public"));

/* app.get("/view", async (req, res) => {
  
  res.render("index", { title: "Hello World" ,games});
}); */

routerApi(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
