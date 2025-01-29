$(function () {
    interface Objeto {
        marca: string;
        modelo: string;
    }

    function funAjax(e: JQuery.SubmitEvent) {
        e.preventDefault(); // Para no abandonar la página al enviar el formulario.

        // Obtener los datos del formulario
        const marca = $('#marca').val() as string;
        const modelo = $('#modelo').val() as string;
        const datos: Objeto = { marca, modelo };

        // --------------------- 1. Ajax con Promesas (fetch, .then) ---------------------
        fetch('Ensayo_examen1_2Eva_25.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        .then(response => {
            if (!response.ok) throw new Error('Error en la solicitud fetch');
            return response.json();
        })
        .then(data => {
            $('#datos').html(`<h1>Marca: ${data.marca}, Modelo: ${data.modelo}</h1>`);
        })
        .catch(error => {
            const errorMessage = (error as Error).message;
            $('#datos').html(`<h1>Error: ${errorMessage}</h1>`);
        });

        // --------------------- 2. Ajax con jQuery $.post() ----------------------------
        $.post('Ensayo_examen1_2Eva_25.php', datos, function (data) {
            try {
                let respuesta = typeof data === 'string' ? JSON.parse(data) : data;
                $('#datos').html(`<h1>Marca: ${respuesta.marca}, Modelo: ${respuesta.modelo}</h1>`);
            } catch (error) {
                $('#datos').html('<h1>Error al procesar la respuesta de $.post</h1>');
            }
        }).fail(function () {
            $('#datos').html('<h1>Error en la solicitud con $.post</h1>');
        });

        // ------------- 3. Enviando el formulario usando FormData ---------------------
        let formData = new FormData();
        formData.append('marca', marca);
        formData.append('modelo', modelo);

        $.ajax({
            url: 'Ensayo_examen1_2Eva_25.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                try {
                    let respuesta = typeof data === 'string' ? JSON.parse(data) : data;
                    $('#datos').html(`<h1>Marca: ${respuesta.marca}, Modelo: ${respuesta.modelo}</h1>`);
                } catch (error) {
                    $('#datos').html('<h1>Error al procesar la respuesta de FormData</h1>');
                }
            },
            error: function () {
                $('#datos').html('<h1>Error en la solicitud con FormData</h1>');
            }
        });

        // ---------------------- 4. Usando Async/Await -------------------------
        async function enviarDatosAsync() {
            try {
                const response = await fetch('Ensayo_examen1_2Eva_25.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                });

                if (!response.ok) throw new Error('Error en la solicitud async/await');

                const data = await response.json();
                $('#datos').html(`<h1>Marca: ${data.marca}, Modelo: ${data.modelo}</h1>`);
            } catch (error) {
                const errorMessage = (error as Error).message;
                $('#datos').html(`<h1>Error: ${errorMessage}</h1>`);
            }
        }
        enviarDatosAsync();
    }

    $('form').on('submit', funAjax);
});