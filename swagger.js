const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Anime API",
      version: "1.0.0",
      description: "Mini API di esempio per anime",
    },
  },
  apis: ["./index.js"], // Specifica dove stanno i commenti con annotazioni Swagger
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
