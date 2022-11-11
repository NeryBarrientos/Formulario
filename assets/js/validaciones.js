export function validar(input){
    const tipo_input = input.dataset.tipo;
    if(validadores[tipo_input]){
        validadores[tipo_input](input)
    };
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    }else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrar_mensaje_error(tipo_input,input);
    }
};

const tipo_errorres = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
] 

const mensajes_error = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacío'
    },
    email: {
        valueMissing: 'el campo correo no puede estar vacío',
        typeMismatch: 'El correo no es válido'
    },
    password: {
        valueMissing: 'El campo contraseña no puede estar vacío',
        patternMismatch: 'Mínimo ocho caracteres, al menos una letra, un número y un carácter especial'
    },
    nacimiento: {
        valueMissing: 'El campo fecha de nacimiento no puede estar vacío',
        customError: 'Debes tener al menos 18 años de edad',
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El formato requerido es: +502xxxxxxxx'
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La dirección debe contener entre 10 y 40 caracteres'
    },
    departamento: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El departamento debe contener entre 5 y 40 caracteres'
    },
    municipio: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El municipio debe contener entre 5 y 40 caracteres'
    },
}

const validadores = {
    nacimiento: input => validar_nacimiento(input),

};

function mostrar_mensaje_error(tipo,input) {
    let mensaje = ''
    tipo_errorres.forEach(error => {
        if(input.validity[error]){
            console.log(error)
            console.log(input.validity[error]);
            console.log(mensajes_error[tipo][error])
            mensaje = mensajes_error[tipo][error]
        }
    })
    return mensaje
}

function validar_nacimiento(input) {
    const fecha_cliente = new Date(input.value);
    let mensaje = '';
    if (!mayor_edad(fecha_cliente)) {
        mensaje = 'Debes tener al menos 18 años de edad';
    };
    input.setCustomValidity(mensaje);
};

function mayor_edad(fecha) {
    const fecha_actual = new Date();
    const diferencia_fechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferencia_fechas <= fecha_actual;
};