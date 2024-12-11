<?php
/**
 * Archivo usado para realizar conexiones (tomado de la asignatura DWES)
 */

 // Creamos una clase llamada conexión, en la que generamos una conexión a una base de datos empleando PHP, usando para ello un objeto de la clase PDO,
 // que cuenta con métodos específicos para realizar dichas conexiones.
 class Conexion {
        public $pdo;
        public function __construct()
        {
            try {
                // Indicamos el host y el nombre de la base de datos
                $dsn = "mysql:host=localhost;dbname=tema10";
                $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_PERSISTENT => false,
                    PDO::ATTR_EMULATE_PREPARES => false,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
                ];
                // Añadimos a la propiedad de la clase un objeto de la clase PDO, pasandole como parametros $dsn (string con datos de host y BBDD), usuario, contraseña y el array
                // $options con los múltiples atributos
                $this->pdo = new PDO($dsn, "root", "", $options);
            } catch (PDOException $e) {
                // Definimos la información del error y cerramos el script en caso de saltar excepción
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

    // Creamos una estructura en la que, según lo que se solicite a través del método GET, realiza una u otra consulta
    if (isset($_GET['nombresId'])) {
        // Vamos a crear la consulta correspondiente
        $sql = "SELECT id, nombre FROM tema10.datos";

        // Realizamos la conexión y preparamos la consulta
        $conexion = new Conexion();
        $pdostmt = $conexion->pdo->prepare($sql);

        // Ejecutamos la consulta
        $pdostmt->execute();

        // Indicamos el tipo de fetch para el resultado
        $result = $pdostmt->fetchAll(PDO::FETCH_ASSOC);

        // Devolvemos el resultado, convertido a JSON
        echo json_encode($result);

        
    } else if (isset($_GET['id'])){
        // Capturamos el valor enviado mediante el método GET
        $id = $_GET['id'];
        // Vamos a crear la consulta correspondiente
        $sql = "SELECT id, nombre, apellidos, ciudad FROM tema10.datos WHERE id = :id";

        // Realizamos la conexión y preparamos la consulta
        $conexion = new Conexion();
        $pdostmt = $conexion->pdo->prepare($sql);

        //Vinculamos la variable
        $pdostmt->bindParam(':id', $id, PDO::PARAM_INT);

        // Ejecutamos la consulta
        $pdostmt->execute();

        // Indicamos el tipo de fetch para el resultado
        $result = $pdostmt->fetchAll(PDO::FETCH_ASSOC);

        // Devolvemos el resultado, convertido a JSON
        echo json_encode($result);
    }
?>