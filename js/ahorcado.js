// canvas 200x300
const canvas = document.getElementById('ahorcadoCanvas');
const ctx = canvas.getContext('2d');
var dificultad;
var palabra = '';
var palabra_oculta = '';
var intentos_erroneos = 0;

const palabras = {
    'facil': [
        'casa',
        'perro',
        'gato',
        'sol',
        'arbol',
        'flor',
        'pan',
        'pez',
        'luna',
        'rojo'
    ],
    'medio': [
        'computadora',
        'escuela',
        'montana',
        'elefante',
        'mariposa',
        'guitarra',
        'chocolate',
        'biblioteca',
        'aventura',
        'secreto'
    ],
    'dificil': [
        'electroencefalografista',
        'hipopotomonstrosesquipedaliofobia',
        'esternocleidomastoideo',
        'otorrinolaringologo',
        'paralelepipedo',
        'desoxirribonucleico',
        'circunstancias',
        'extraterrestre',
        'psicologico',
        'transformacion'
    ]
};

function dificultadChanged(dificultad_seleccionada) {
    dificultad = dificultad_seleccionada;
    reiniciarJuego();
}

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animarLinea(x1, y1, x2, y2, duracion, callback) {
    let startTime = null;

    function drawStep(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = (timestamp - startTime) / duracion;

        if (progress > 1) progress = 1;

        let x = x1 + (x2 - x1) * progress;
        let y = y1 + (y2 - y1) * progress;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x, y);
        ctx.stroke();

        if (progress < 1) {
            requestAnimationFrame(drawStep);
        } else if (callback) {
            callback();
        }
    }

    requestAnimationFrame(drawStep);
}

function animarCabeza(duracion) {
    let startTime = null;

    function drawStep(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = (timestamp - startTime) / duracion;

        if (progress > 1) progress = 1;

        ctx.beginPath();
        ctx.arc(150, 75, 25 * progress, 0, Math.PI * 2);
        ctx.stroke();

        if (progress < 1) {
            requestAnimationFrame(drawStep);
        }
    }

    requestAnimationFrame(drawStep);
}

function dibujarHorca() {
    animarLinea(20, 280, 180, 280, 500, () => {
        animarLinea(50, 280, 50, 20, 500, () => {
            animarLinea(50, 20, 150, 20, 500, () => {
                animarLinea(150, 20, 150, 50, 500);
            });
        });
    });
}

function dibujarCabeza() {
    animarCabeza(500);
}

function dibujarCuerpo() {
    animarLinea(150, 100, 150, 200, 500);
}

function dibujarBrazoIzquierdo() {
    animarLinea(150, 130, 120, 160, 500);
}

function dibujarBrazoDerecho() {
    animarLinea(150, 130, 180, 160, 500);
}

function dibujarPiernaIzquierda() {
    animarLinea(150, 200, 120, 230, 500);
}

function dibujarPiernaDerecha() {
    animarLinea(150, 200, 180, 230, 500);
}

const partesAhorcado = [
    dibujarHorca,
    dibujarCabeza,
    dibujarCuerpo,
    dibujarBrazoIzquierdo,
    dibujarBrazoDerecho,
    dibujarPiernaIzquierda,
    dibujarPiernaDerecha
];

function reiniciarJuego() {
    limpiarCanvas();
    setDisabled(false);
    intentos_erroneos = 0;
    palabra = palabras[dificultad][Math.floor(Math.random() * palabras[dificultad].length)];
    palabra_oculta = '_ '.repeat(palabra.length).split(' ');
    setPalabraOcultaTexto();
    dibujarAhorcado();
}

function setPalabraOcultaTexto() {
    document.getElementById('palabra').innerText = palabra_oculta.join(' ');
}

function dibujarAhorcado() {
    partesAhorcado[intentos_erroneos]();
}

window.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key.length !== 1 || key.match('[a-zA-Z]') === null) {
        return;
    }
    key = key.toLowerCase()
    el = document.getElementById(key);
    if (el.disabled) {
        return;
    }
    el.classList.add('letraP');
});

window.addEventListener('keyup', (event) => {
    let key = event.key;
    if (key.length !== 1 || key.match('[a-zA-Z]') === null) {
        return;
    }
    key = key.toLowerCase();
    el = document.getElementById(key);
    if (el.disabled) {
        return;
    }
    el.classList.remove('letraP');
    checarLetra(key, el);
});

function checarLetra(letra, el) {
    let encontrado = false;
    for (i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
            encontrado = true;
            palabra_oculta[i] = letra;
        }
    }
    el.disabled = true;
    if (encontrado) {
        el.classList.add('correcta');
        setPalabraOcultaTexto();
        // Checar si ya se encontraron todas las letras, si es así monstrar el mensaje de ganar
        if (!palabra_oculta.includes('_')) {
            ganar();
        }
    } else {
        el.classList.add('incorrecta');
        intentos_erroneos += 1;
        // Checar si ya se alcanzó el límite de errores
        dibujarAhorcado();
        if (intentos_erroneos == 6) {
            perder();
        }
    }
}

function setDisabled(disabled) {
    document.querySelectorAll('#row1 > button').forEach((button) => {
        button.disabled = disabled;
    });
    document.querySelectorAll('#row2 > button').forEach((button) => {
        button.disabled = disabled;
    });
    document.querySelectorAll('#row3 > button').forEach((button) => {
        button.disabled = disabled;
    });
}

function ganar() {
    setDisabled(true);
    Swal.fire({
        title: 'Felicidades!!',
        icon: 'success',
        text: 'Has Ganado c:'
    });
}

function perder() {
    setDisabled(false);
    Swal.fire({
        title: 'Opps!!',
        icon: 'error',
        text: 'Has Perdido :c'
    });
}