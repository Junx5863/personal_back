import Router from "express";
import UserRoutes from "./user.routes.js";


const routerApi = Router();

routerApi.use("/users", UserRoutes);


export default routerApi;
