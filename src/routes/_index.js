import express from "express";
import { indexRouter } from "./_barrel.js";

const routerApi = (app) => {
    const router = express.Router();
    app.use("/api/v1", router);



    //publicas
    router.use("/product", indexRouter.userRoutes);

    //privadas

};

export default routerApi;