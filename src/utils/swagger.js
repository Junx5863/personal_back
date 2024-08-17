const  swaggerJsdoc  = require("swagger-jsdoc");
const  swaggerUi  = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "API description",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/routes/docs.router.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerSetup = (app) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('Swagger initialized successfully 🚀');

};

module.exports = swaggerSetup;

