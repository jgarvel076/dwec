$(function () {
    interface Objeto {
        marca: string;
        modelo: string;
    }

    function funAjax(e: any) {
        e.preventDefault(); // Para no abandonar la página al enviar el formulario.

        // Obtener los datos del formulario
        const marca = $('#marca').val() as string;
        const modelo = $('#modelo').val() as string;
        const datos: Objeto = { marca, modelo };

        // --------------------- 1. Ajax con Promesas (fetch, .then) ---------------------
        fetch('procesar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            $('#datos').html(`<h1>Marca: ${data.marca}, Modelo: ${data.modelo}</h1>`);
        })
        .catch(error => {
            $('#datos').html(`<h1>Error: ${error}</h1>`);
        });

        // --------------------- 2. Ajax con jQuery $.post() ----------------------------
        $.post('procesar.php', datos, function (data) {
            let respuesta = JSON.parse(data);
            $('#datos').html(`<h1>Marca: ${respuesta.marca}, Modelo: ${respuesta.modelo}</h1>`);
        }).fail(function () {
            $('#datos').html('<h1>Error en la solicitud con $.post</h1>');
        });

        // ------------- 3. Enviando el formulario usando FormData ---------------------
        let formData = new FormData();
        formData.append('marca', marca);
        formData.append('modelo', modelo);

        $.ajax({
            url: 'procesar.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                let respuesta = JSON.parse(data);
                $('#datos').html(`<h1>Marca: ${respuesta.marca}, Modelo: ${respuesta.modelo}</h1>`);
            },
            error: function () {
                                                         $('#datos').html('<h1>Error en la solicitud con FormData</h1>');
            }
        });

        // ---------------------- 4. Usando Async/Await -------------------------
        async function enviarDatosAsync() {
            try {
                const response = await fetch('procesar.php', {
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
                $('#datos').html(`<h1>Error: ${error}</h1>`);
            }
        }
        enviarDatosAsync();
    }

    $('form').on('submit', funAjax);
});
