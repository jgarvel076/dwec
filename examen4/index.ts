//creamos la interfaz Art para la estructura de los articulos
interface Art {
    id: number;
    cod: string;
    color: string;
    piel: string;
}

//clase Articulos
class Articulos {
    constructor() {
        this.getArticulos();
        //evento de envio 
        $("#f1").on("submit", (event) => {
            event.preventDefault();
            this.pushArticulo();
        });
    }

    //obtener los articulos 
    getArticulos() {
        //peticion get
        fetch("http://localhost:3000/getArticulos")
            .then(response => response.json())
            .then(data => {
                let html = "";
                //creamos tabla
                data.forEach((art: Art) => {
                    html += 
                    `<tr>
                        <td>${art.id}</td>
                        <td>${art.cod}</td>
                        <td>${art.color}</td>
                        <td>${art.piel}</td>
                    </tr>`;
                });
                $("#carteras").html(html);
            })
            .catch(error => console.error("Error obteniendo artículos", error));
    }

    //enviar los articulos
    pushArticulo() {
        //obtener valores
        let cod = (document.getElementById("cod") as HTMLInputElement).value;
        let color = (document.getElementById("color") as HTMLInputElement).value;
        let piel = (document.getElementById("piel") as HTMLInputElement).value;

        //enviamos peticion post
        fetch("http://localhost:3000/pushArticulos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cod, color, piel }),
        })
        .then(() => {
            //cargamos lista 
            this.getArticulos();
        })
        .catch(error => console.error("Error al añadir artículo", error));
    }
}

// Ejecutamos la clase sin el ready
new Articulos();
