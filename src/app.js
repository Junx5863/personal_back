import express from "express";
import mongoose from "mongoose";
import routerApi  from './routes/user.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);


routerApi(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
