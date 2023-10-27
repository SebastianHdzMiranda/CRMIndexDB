(function () {
    console.log(editando);

    // ejecutador
    window.onload = ()=> {
        conectarDB();
        formulario.addEventListener('submit', validarForm);
    }


    // validacion
    function validarForm(e) {
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
            
        const cliente = {nombre, email, telefono, empresa, id: Date.now()}
        // conectando con indexDB
        creandoNuevoCliente(cliente);

        // redirijiendo a index.html
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }


    /* FUNCION CREATE */
    function creandoNuevoCliente(cliente) {
        /* IndexDB -> CREATE */
        const transaction = DB.transaction(['clientes'], 'readwrite');
        const objectStore = transaction.objectStore('clientes');

        objectStore.add(cliente);

        transaction.oncomplete = ()=> {
            imprimirAlerta('El cliente se agrego correctamente');               
        }
        transaction.onerror = ()=> {
            imprimirAlerta('Hubo un error', 'error');                
        }
    }
})();