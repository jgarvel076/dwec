//clase Articulos
var Articulos = /** @class */ (function () {
    function Articulos() {
        var _this = this;
        this.getArticulos();
        //evento de envio 
        $("#f1").on("submit", function (event) {
            event.preventDefault();
            _this.pushArticulo();
        });
    }
    //obtener los articulos 
    Articulos.prototype.getArticulos = function () {
        //peticion get
        fetch("http://localhost:3000/getArticulos")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var html = "";
            //creamos tabla
            data.forEach(function (art) {
                html +=
                    "<tr>\n                        <td>".concat(art.id, "</td>\n                        <td>").concat(art.cod, "</td>\n                        <td>").concat(art.color, "</td>\n                        <td>").concat(art.piel, "</td>\n                    </tr>");
            });
            $("#carteras").append(html);
        })
            .catch(function (error) { return console.error("Error obteniendo artículos", error); });
    };
    //enviar los articulos
    Articulos.prototype.pushArticulo = function () {
        var _this = this;
        //obtener valores
        var cod = document.getElementById("cod").value;
        var color = document.getElementById("color").value;
        var piel = document.getElementById("piel").value;
        //enviamos peticion post
        fetch("http://localhost:3000/pushArticulos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cod: cod, color: color, piel: piel }),
        })
            .then(function () {
            //cargamos lista 
            _this.getArticulos();
        })
            .catch(function (error) { return console.error("Error al añadir artículo", error); });
    };
    return Articulos;
}());
// Ejecutamos la clase sin el ready
new Articulos();
