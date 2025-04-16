const fs = require("fs");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Anime API",
      version: "1.0.0",
    },
  },
  apis: ["./index.js"],
};

const specs = swaggerJsdoc(options);

fs.writeFileSync("./swagger.json", JSON.stringify(specs, null, 2));
