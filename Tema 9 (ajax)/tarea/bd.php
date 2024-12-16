<?php
 //clase conexión, generamos una conexión a la base de datos
 class Conexion {
        public $pdo;
        public function __construct()
        {
            try {
                // indicamos el host y el nombre de la base de datos
                $dsn = "mysql:host=localhost;dbname=tema10";
                $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_PERSISTENT => false,
                    PDO::ATTR_EMULATE_PREPARES => false,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
                ];
                $this->pdo = new PDO($dsn, "root", "", $options);
            } catch (PDOException $e) {
                // definimos la información del error
                echo "ERROR BASE DE DATOS: ";
                echo "<HR>";
                echo "Mensaje de Error:      ". $e->getMessage(). "<BR>";
                echo "Código de Error:     ". $e->getCode(). "<BR>";
                echo "Fichero:      ". $e->getFile(). "<BR>";
                echo "Linea:        ". $e->getLine(). "<BR>";
                echo "Trace:        ". $e->getTraceAsString(). "<BR>";
                exit();
            }
        }
    }

    if (isset($_GET['nombresId'])) {
        // creamos la consulta 
        $sql = "SELECT id, nombre FROM tema10.datos";

        // realizamos la conexión
        $conexion = new Conexion();
        $pdostmt = $conexion->pdo->prepare($sql);

        // ejecutamos la consulta
        $pdostmt->execute();

        // indicamos el tipo de fetch para el resultado
        $result = $pdostmt->fetchAll(PDO::FETCH_ASSOC);

        // devolvemos el resultado como JSON
        echo json_encode($result);

        
    } else if (isset($_GET['id'])){
        // capturamos el valor del método GET
        $id = $_GET['id'];
        // creamos la consulta 
        $sql = "SELECT id, nombre, apellidos, ciudad FROM tema10.datos WHERE id = :id";

        // realizamos la conexión
        $conexion = new Conexion();
        $pdostmt = $conexion->pdo->prepare($sql);

        // vinculamos la variable
        $pdostmt->bindParam(':id', $id, PDO::PARAM_INT);

        // ejecutamos la consulta
        $pdostmt->execute();

        // indicamos el tipo de fetch para el resultado
        $result = $pdostmt->fetchAll(PDO::FETCH_ASSOC);

        // devolvemos el resultado, convertido a JSON
        echo json_encode($result);
    }
?>