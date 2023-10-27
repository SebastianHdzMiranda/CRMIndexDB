// IIFE
(function() {
    // selectores
    const contenedorListado = document.querySelector('#listado-clientes');

    // variable
    let DB;
    
    // ejecutador
    window.onload = ()=> {
        crearDB();
        contenedorListado.addEventListener('click', eliminarCliente);
    } 

    /*FUNCION READ*/   
    function imprimirClientes(){
        limpiarHTML();

        /* IndexDB -> READ */
        const transaction = DB.transaction(['clientes']);
        const objectStore = transaction.objectStore('clientes');
        const solicitud = objectStore.openCursor();

        solicitud.onsuccess = ()=> {
            const cursor = solicitud.result;

            if (cursor) {
                const {nombre, email, telefono, empresa, id} = cursor.value

                /* += 
                    se utiliza para agregar contenido al final de una cadena o elemento en lugar de reemplazarlo. 
                    Si previamente había contenido en contenedorListado, el operador += agrega el nuevo contenido HTML después del contenido existente,
                */
                contenedorListado.innerHTML += `
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold">${nombre}</p>
                            <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <p class="text-gray-700">${telefono}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">    
                            <p class="text-gray-600">${empresa}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                            <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                            <a href="#" data-cliente=${id} class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                        </td>                    
                    </tr>
                `;
                

                cursor.continue();
            }
        }

    }

    function limpiarHTML() {
        while(contenedorListado.firstChild) {
            contenedorListado.removeChild(contenedorListado.firstChild);
        }
    }

    function crearDB() {
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onsuccess = ()=> {
            // pasando la BD a una variable global
            DB = crearDB.result;

            imprimirClientes();
        }

        crearDB.onerror = ()=> {
            console.log('Hubo un error');
        }

        crearDB.onupgradeneeded = ()=> {
            const db = crearDB.result;

            const objecStore = db.createObjectStore('clientes', { 
                keyPath: 'id',
                autoIncrement: true,
            });

            objecStore.createIndex('nombre', 'nombre', {unique: false})
            objecStore.createIndex('correo', 'correo', {unique: true})
            objecStore.createIndex('telefono', 'telefono', {unique: false})
            objecStore.createIndex('empresa', 'empresa', {unique: false})
            objecStore.createIndex('id', 'id', {unique: true})

        }

    }
    
    /*FUNCION DELETE*/
    function eliminarCliente(e) {
        if (e.target.classList.contains('eliminar')) {
            e.preventDefault();
            const id = Number(e.target.dataset.cliente);

            console.log(id);

            /* ventanas emergentes
                confirm: ventana emergente que me permite confirmar acciones, para ventanas emergentes mas personalizadas visitar la libreria sweet alert: https://sweetalert2.github.io/ 
            */
            const confirmar = confirm('Deseas eliminar este cliente?');

            if(confirmar){
                const transaction = DB.transaction(['clientes'], 'readwrite');
                const objectStore = transaction.objectStore('clientes');
    
                objectStore.delete(id);
                transaction.oncomplete = ()=> {
                    imprimirClientes();
                }
                transaction.onerror = ()=> {
                    console.log('Hubo un error');
                }
            }
        }
    }
})();