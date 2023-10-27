(function () {
    editando = true;
    console.log(editando);
    // instanciar una clase nativa que viene de JS para obtener el id desde params
    const url = new URL(window.location);
    const id = Number(url.searchParams.get('id'));

    // ejecutador
    window.onload = ()=> {
        conectarDB();
        setTimeout(() => {
            llenarForm();
        }, 100);
        formulario.addEventListener('submit', validarForm);
    }

    // validacion 
    function validarForm(e) {
        e.preventDefault();


        // // tomando datos
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');    
            return;
        } 

        const cliente = {nombre, email, telefono, empresa, id};
        actualizarCliente(cliente);

        // redirijiendo a index.html
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);

    }

    /* FUNCION UPDATE*/
    function actualizarCliente(cliente) {
        /* IndexDB -> UPTATE */
        const transaction = DB.transaction(['clientes'], 'readwrite');
        const objectStore = transaction.objectStore('clientes');

        objectStore.put(cliente);

        transaction.oncomplete = ()=> {
            imprimirAlerta('Se actualizo correctamente');               
        }
        transaction.onerror = ()=> {
            imprimirAlerta('Hubo un error', 'error');                
        }
    }

    /*FUNCION QUE LLENA LOS INPUTS */
    function llenarForm() {
        

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
})();