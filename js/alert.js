async function encuesta() {
    // Preguntas:
    // ¿Cuál es tu película favorita ?
    // ¿Cuál es tu género de película preferido ?
    // ¿Cuál es tu actor o actriz favorito / a ?
    // ¿Cuál consideras que es la mejor película de ciencia ficción ?
    // ¿Cuál es tu plataforma de streaming favorita ?
    await Swal.fire({
        title: 'Bienvenido a la encuesta',
        text: 'Por favor, responda las siguientes preguntas',
        icon: 'info',
        confirmButtonText: 'Comenzar',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: false,
    });

    // Pregunta 1
    var { value: resuesta } = await Swal.fire({
        title: '¿Cuál es tu película favorita ?',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Siguiente',
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
            if (!value) {
                Swal.showValidationMessage('Por favor, ingrese una respuesta válida');
            }
        },
    });
    var el = document.createElement('li');
    document.getElementById('r1').appendChild(el);
    el.textContent = resuesta;


    // Pregunta 2
    var { value: resuesta } = await Swal.fire({
        title: '¿Cuál es tu género de película preferido ?',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Siguiente',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
            if (!value) {
                Swal.showValidationMessage('Por favor, ingrese una respuesta válida');
            }
        },
    });
    var el = document.createElement('li');
    document.getElementById('r2').appendChild(el);
    el.textContent = resuesta;

    // Pregunta 3
    var { value: resuesta } = await Swal.fire({
        title: '¿Cuál es tu actor o actriz favorito / a ?',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Siguiente',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
            if (!value) {
                Swal.showValidationMessage('Por favor, ingrese una respuesta válida');
            }
        },
    });
    var el = document.createElement('li');
    document.getElementById('r3').appendChild(el);
    el.textContent = resuesta;

    // Pregunta 4
    var { value: resuesta } = await Swal.fire({
        title: '¿Cuál consideras que es la mejor película de ciencia ficción ?',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Siguiente',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
            if (!value) {
                Swal.showValidationMessage('Por favor, ingrese una respuesta válida');
            }
        },
    });
    var el = document.createElement('li');
    document.getElementById('r4').appendChild(el);
    el.textContent = resuesta;

    // Pregunta 5
    var { value: resuesta } = await Swal.fire({
        title: '¿Cuál es tu plataforma de streaming favorita ?',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Finalizar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
            if (!value) {
                Swal.showValidationMessage('Por favor, ingrese una respuesta válida');
            }
        },
    });
    var el = document.createElement('li');
    document.getElementById('r5').appendChild(el);
    el.textContent = resuesta;

    await Swal.fire({
        title: 'Gracias por responder la encuesta :)',
        text: 'Tus respuestas han sido registradas',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        allowEscapeKey: false,
    });
}

window.addEventListener('DOMContentLoaded', function () {
    encuesta();
});