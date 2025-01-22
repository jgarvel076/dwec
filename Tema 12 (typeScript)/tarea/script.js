var Boton = /** @class */ (function () {
    function Boton(id) {
        this.id = id;
        var button = $('<button></button>')
            .text("Bot\u00F3n ".concat(id))
            .on('click', function () { return alert("Bot\u00F3n ".concat(id, " presionado")); })
            .addClass('dynamic-button');
        $('#buttonContainer').append(button);
    }
    return Boton;
}());
var GrupoBot = /** @class */ (function () {
    function GrupoBot() {
        this.contador = 0;
    }
    GrupoBot.getInstance = function () {
        if (!GrupoBot.instance) {
            GrupoBot.instance = new GrupoBot();
        }
        return GrupoBot.instance;
    };
    GrupoBot.prototype.add = function () {
        this.contador++;
        new Boton(this.contador);
    };
    GrupoBot.prototype.rest = function () {
        if (this.contador > 0) {
            $('#buttonContainer button:last-child').remove();
            this.contador--;
        }
    };
    return GrupoBot;
}());
$(document).ready(function () {
    var grupoBot = GrupoBot.getInstance();
    $('#addBtn').on('click', function () { return grupoBot.add(); });
    $('#removeBtn').on('click', function () { return grupoBot.rest(); });
});
