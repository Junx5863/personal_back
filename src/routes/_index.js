const express = require("express");
const { indexRouter } = require("./_barrel");

const routerApi = (app) => {
    const router = express.Router();
    app.use("/api/v1", router);



    //publicas
    router.use("/session", indexRouter.userRoutes);

    //privadas

};

module.exports = routerApi;