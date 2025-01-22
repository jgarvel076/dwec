interface IGrupoBot {
    add(): void;
    rest(): void;
}

class Boton {
    constructor(public id: number) {
        const button = $('<button></button>')
            .text(`Botón ${id}`)
            .on('click', () => alert(`Botón ${id} presionado`))
            .addClass('dynamic-button');
        $('#buttonContainer').append(button);
    }
}

class GrupoBot implements IGrupoBot {
    private contador: number = 0;
    private static instance: GrupoBot;

    private constructor() {}

    static getInstance(): GrupoBot {
        if (!GrupoBot.instance) {
            GrupoBot.instance = new GrupoBot();
        }
        return GrupoBot.instance;
    }

    add(): void {
        this.contador++;
        new Boton(this.contador);
    }

    rest(): void {
        if (this.contador > 0) {
            $('#buttonContainer button:last-child').remove();
            this.contador--;
        }
    }
}

$(document).ready(() => {
    const grupoBot = GrupoBot.getInstance();

    $('#addBtn').on('click', () => grupoBot.add());
    $('#removeBtn').on('click', () => grupoBot.rest());
});