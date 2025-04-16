/**
 * @swagger
 * /anime:
 *   get:
 *     summary: Ottiene una lista di anime
 *     responses:
 *       200:
 *         description: Lista di anime
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`
    <h1>Benvenuto nella Anime API 🚀</h1>
    <p>Visita la <a href="/api-docs">Swagger UI</a> per la documentazione.</p>
  `);
});

// Rotta API
app.get("/anime", (req, res) => {
  res.json([
    { id: 1, name: "Naruto" },
    { id: 2, name: "One Piece" },
    { id: 3, name: "Attack on Titan" },
  ]);
});

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Avvio server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api-docs`);
});
