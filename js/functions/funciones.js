import { contenedorListado } from "../variables/variables.js";

export function imprimirAlerta(mensaje, tipo) {
    // evitando duplicidad
    const alerta = document.querySelector('.alerta');
    if (!alerta) {
        // creando una alerta
        const divMensaje = document.createElement('div');
        divMensaje.className = 'px-4 py-3 rounded max-w-lg mx-auto mt-6 text-center border alerta';

        if(tipo === 'error'){
            divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        } else {
            divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
        }

        divMensaje.textContent= mensaje;
        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 2000);
    }
}

// validacion 
export function validarForm(e) {
    e.preventDefault();


    // tomando datos
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    if (nombre === '' || email === '' || telefono === '' || empresa === '') {
        imprimirAlerta('Todos los campos son obligatorios', 'error');    
        return;
    } 

    if (editando) {
        
        const cliente = {nombre, email, telefono, empresa, id};
        actualizarCliente(cliente);
    } else {

        const cliente = {nombre, email, telefono, empresa, id: Date.now()}
        creandoNuevoCliente(cliente);
    }


    // redirijiendo a index.html
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);

}

/*FUNCION QUE LLENA LOS INPUTS */
export function llenarForm() {
    

    const transaction = DB.transaction('clientes');
    const objectStore = transaction.objectStore('clientes');
    const solicitud = objectStore.get(id);

    solicitud.onsuccess = ()=> {
        const registro = solicitud.result;
        if (registro) {
            const  {nombre, email, telefono, empresa, id} = registro;

            document.querySelector('#nombre').value = nombre;
            document.querySelector('#email').value = email;
            document.querySelector('#telefono').value = telefono;
            document.querySelector('#empresa').value = empresa;
        }

    }
}

export function limpiarHTML() {
    while(contenedorListado.firstChild) {
        contenedorListado.removeChild(contenedorListado.firstChild);
    }
}


