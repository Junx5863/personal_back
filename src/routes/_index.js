import express from "express";
import { videoGameRoutes } from "./_barrel.js";


const routerApi = (app) => {
    const router = express.Router();
    app.use("/api/v1", router);



    //publicas
    router.use("/product", videoGameRoutes.userRoutes);


    router.use("/carrito", videoGameRoutes.carritoRoutes);

    //privadas

    //views
    router.use("/", videoGameRoutes.listGames)

};

export default routerApi;