import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";

const app = express();
const port = 3000;

const uri = "mongodb+srv://jgarvel076:mEm9uB8vRAheknq5@cluster0.tvn2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(express.json());
app.use(cors());

async function connectDB() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error conectando a MongoDB", err);
  }
}
connectDB();

const db = client.db("Centro");
const collection = db.collection("Usuarios");

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await collection.find({}).toArray();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    const { nombre, apellido } = req.body;
    await collection.insertOne({ nombre, apellido });
    res.json({ mensaje: "Usuario agregado" });
  } catch (err) {
    res.status(500).json({ error: "Error agregando usuario" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});