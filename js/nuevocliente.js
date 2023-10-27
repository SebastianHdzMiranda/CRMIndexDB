import { validarForm } from "./functions/funciones.js";
import { conectarDB } from "./service/indexDB.js";
import { formulario } from "./variables/variables.js";

(function () {

    // ejecutador
    window.onload = ()=> {
        conectarDB();
        formulario.addEventListener('submit', validarForm);
    }

})();