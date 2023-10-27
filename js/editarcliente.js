import { llenarForm, validarForm } from "./functions/funciones.js";
import { conectarDB } from "./service/indexDB.js";
import { edicion, editando, formulario } from "./variables/variables.js";

// instanciar una clase nativa que viene de JS para obtener el id desde params
const url = new URL(window.location);
export const id = Number(url.searchParams.get('id'));

(function () {

    // ejecutador
    window.onload = ()=> {
        edicion(true);
        conectarDB();
        setTimeout(() => {
            llenarForm();
        }, 100);
        formulario.addEventListener('submit', validarForm);
    }

})();
