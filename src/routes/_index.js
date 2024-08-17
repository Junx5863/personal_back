const express = require("express");
const { indexRouter } = require("./_barrel");

const routerApi = (app) => {
    const router = express.Router();
    app.use("/api/v1", router);



    //publicas
    router.use("/session", indexRouter.userRoutes);

    router.use("/ticket", indexRouter.ticketRoutes);


    router.use("/carrito", indexRouter.carritoRoutes);

    //privadas

};

module.exports = routerApi;