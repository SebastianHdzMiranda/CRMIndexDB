import { eliminarCliente } from "./service/client-service.js";
import { crearDB } from "./service/indexDB.js";
import { contenedorListado } from "./variables/variables.js";

// IIFE
(function() {
    // ejecutador
    window.onload = ()=> {
        crearDB();
        contenedorListado.addEventListener('click', eliminarCliente);
    }

})();