(function () {

    // ejecutador
    window.onload = ()=> {
        conectarDB();
        formulario.addEventListener('submit', validarForm);
    }

})();