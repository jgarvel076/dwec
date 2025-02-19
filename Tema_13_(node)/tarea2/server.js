import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurar Express
const app = express();
const port = 3000;
app.use(express.json());

// Configurar ruta estática para servir archivos HTML y JS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname));

// Conectar a MongoDB
const uri = "mongodb+srv://jgarvel076:mEm9uB8vRAheknq5@cluster0.tvn2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

let collection;

async function conectarDB() {
  try {
    await client.connect();
    collection = client.db("Centro").collection("Alumnos");
    console.log("Conectado a MongoDB Cloud");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

// Rutas API
app.get('/alumnos', async (req, res) => {
  const alumnos = await collection.find().toArray();
  res.json(alumnos);
});

app.post('/alumnos', async (req, res) => {
  const { nombre, apellido } = req.body;
  if (!nombre || !apellido) return res.status(400).json({ error: "Nombre y apellido son obligatorios" });

  const resultado = await collection.insertOne({ nombre, apellido });
  res.json({ mensaje: "Alumno añadido", id: resultado.insertedId });
});

// Ruta para ve el HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "2.html"));
});

// Iniciamos servidor
app.listen(port, async () => {
  await conectarDB();
  console.log(`Mostrando en http://localhost:${port}`);
});