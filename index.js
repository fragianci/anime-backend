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
 *                   _id:
 *                     type: string
 *                   genres:
 *                     type: array
 *                     items:
 *                       type: string
 *                   title:
 *                     type: string
 *                   num_mflix_comments:
 *                     type: integer
 *                   poster:
 *                     type: string
 *                   fullplot:
 *                     type: string
 *                   cast:
 *                     type: array
 *                     items:
 *                       type: string
 *                   year:
 *                     type: integer
 *                   type:
 *                     type: string
 */
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 3000;

// Abilita CORS
app.use(cors());

// per prod
// app.use(
//   cors({
//     origin: "https://fragianci.github.io/anime-angular/",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// Connessione a MongoDB
const uri =
  "mongodb+srv://mongo:test@cluster0.zhjh5zf.mongodb.net/test?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send(`
    <h1>Benvenuto nella Anime API 🚀</h1>
    <p>Visita la <a href="/api-docs">Swagger UI</a> per la documentazione.</p>
  `);
});

app.get("/api/movies", async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("sample_mflix").collection("movies");
    const pipeline = [
      {
        $match: {
          runtime: { $gt: 15 },
          num_mflix_comments: { $lt: 110 },
          type: "movie",
        },
      },
      { $sort: { year: -1 } },
      {
        $project: {
          name: 1,
          genres: 1,
          title: 1,
          num_mflix_comments: 1,
          poster: 1,
          fullplot: 1,
          cast: 1,
          year: 1,
          type: 1,
        },
      },
      { $limit: 20 },
    ];

    const movies = await collection.aggregate(pipeline).toArray();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore nel recupero dei dati");
  } finally {
    await client.close();
  }
});

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
