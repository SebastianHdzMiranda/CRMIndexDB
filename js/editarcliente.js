(function () {
    editando = true;

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

})();