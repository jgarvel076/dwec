import express from 'express';
import path from 'path';
const app = express();
const router = express.Router();
var __dirname = path.resolve(); //Resuelve y adapta para módulos ES6
var id=0; //Autocontador
var arts=[]; // Almacena los artículos añadidos simulando una BBDD.

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
 
});
// Devuelve la lista de artículos.
router.get('/getArticulos',function(req,res){
 res.json(arts);
 console.log(arts);
});
// Añade un artículo a la lista de artículos.
router.get('/pushArticulos',function(req,res){
  id++;
  let art=req.query
  art.id=id;
  arts.push(art);
  res.json(arts);
});


app.use('/', router);
app.use(express.static(__dirname));//IMPORTANTE carga archivos js,css, etc.., cargados en los html desde directorio
app.listen(3000);
console.log('Escuchando en puerto 3000');