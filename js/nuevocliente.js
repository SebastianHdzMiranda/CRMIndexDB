(function () {
    // selectores
    const nombre = document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const telefono = document.querySelector('#telefono');
    const empresa = document.querySelector('#empresa');
    const formulario = document.querySelector('#formulario');
    // BD
    let DB;

    window.onload = ()=> {
        conectarDB();
        eventListeners();
    }

    function eventListeners() {
        formulario.addEventListener('submit', enviarForm)
    }

    function enviarForm(e) {
        e.preventDefault();

        // tomando datos
        const campoNombre = nombre.value;
        const campoEmail = email.value;
        const campoTelefono = telefono.value;
        const campoEmpresa = empresa.value;

        if (campoNombre === '' || campoEmail === '' || campoTelefono === '' || campoEmpresa === '') {
            console.log('Todos los campos son necesarios');
        } else {
            
            const cliente = {campoNombre, campoEmail, campoTelefono, campoEmpresa, id: Date.now()}
            
            const transaction = DB.transaction(['clientes'], 'readwrite');
            const objectStore = transaction.objectStore('clientes');

            objectStore.add(cliente);

            transaction.oncomplete = ()=> {
                console.log('datos enviados');
            }
        }


    }



    function conectarDB() {
        const conectarDB = window.indexedDB.open('crm', 1);

        conectarDB.onsuccess = ()=> {
            // pasando la BD a una variable global
            DB = conectarDB.result;
        }
        conectarDB.onerror = ()=> {
            console.log('Hubo un error');
        }
    }
})();