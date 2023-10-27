import { limpiarHTML } from "../functions/funciones.js";
import { contenedorListado } from "../variables/variables.js";
import { DB } from "./indexDB.js";

/* FUNCION CREATE */
export function creandoNuevoCliente(cliente) {
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

/*FUNCION READ*/   
export function imprimirClientes(){
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

/* FUNCION UPDATE*/
export function actualizarCliente(cliente) {
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

/*FUNCION DELETE*/
export function eliminarCliente(e) {
    if (e.target.classList.contains('eliminar')) {
        e.preventDefault();
        const id = Number(e.target.dataset.cliente);

        // console.log(id);

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

