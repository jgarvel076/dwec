// Importamos los módulos necesarios
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

// Servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

// Ruta para la petición AJAX que devuelve un JSON
app.get('/pagAjax', (req, res) => {
    res.json({ NOMBRE: 'Juan', APELLIDO: 'Pérez' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
