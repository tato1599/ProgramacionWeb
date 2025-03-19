async function mcd() {
    var { value: a } = await Swal.fire({
        title: 'Máximo Común Divisor',
        input: 'number',
        inputLabel: 'Número 1',
        inputPlaceholder: 'Ingrese un número',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes ingresar un número!'
            }
        }
    });

    var { value: b } = await Swal.fire({
        title: 'Máximo Común Divisor',
        input: 'number',
        inputLabel: 'Número 2',
        inputPlaceholder: 'Ingrese un número',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes ingresar un número!'
            }
        }
    });

    if (a && b) {
        a = parseInt(a);
        b = parseInt(b);
        var mcd = mcd_euclides(Math.abs(a), Math.abs(b));
        document.getElementById('a').innerHTML = `Primer número: ${a}`;
        document.getElementById('b').innerHTML = `Segundo número: ${b}`;
        document.getElementById('mcd').innerHTML = `Máximo Común Divisor: ${mcd}`;
    }
}

function mcd_euclides(a, b) {
    if (b === 0) {
        return a;
    } else {
        return mcd_euclides(b, a % b);
    }
}