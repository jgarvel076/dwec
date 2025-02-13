import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import path from 'path';
import cors from 'cors';

// Configurar Express
const app = express();
const port = 3000;
app.use(express.json());

// Habilitar CORS
app.use(cors());  // Esto permite que el frontend haga solicitudes al backend sin problemas de CORS

// Servir archivos estáticos (HTML y JS)
app.use(express.static(path.join(__dirname)));

// Conectar a MongoDB
const uri = "mongodb+srv://rsansan079:tHdChGXlqPfhoglc@actividad2dwec.ppd4e.mongodb.net/?retryWrites=true&w=majority&appName=Actividad2DWEC";
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

// Rutas 
app.get('/alumnos', async (req, res) => {
  try {
    const alumnos = await collection.find().toArray();
    res.json(alumnos);
  } catch (error) {
    console.error("Error al obtener alumnos:", error);
    res.status(500).send("Error al obtener alumnos.");
  }
});

app.post('/alumnos', async (req, res) => {
  const { nombre, apellido } = req.body;
  if (!nombre || !apellido) return res.status(400).json({ error: "Nombre y apellido son obligatorios" });

  try {
    const resultado = await collection.insertOne({ nombre, apellido });
    res.json({ mensaje: "Alumno añadido", id: resultado.insertedId });
  } catch (error) {
    console.error("Error al agregar alumno:", error);
    res.status(500).json({ error: "Error al agregar alumno." });
  }
});

// Servir HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor y conectar a la base de datos
app.listen(port, async () => {
  await conectarDB();
  console.log(`Servidor en http://localhost:${port}`);
});
