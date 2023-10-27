import { imprimirClientes } from "./client-service.js";
export let DB;

/* CREA DB */
export function crearDB() {
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

/* CONECTA CON DB */
export function conectarDB() {
    const conectarDB = window.indexedDB.open('crm', 1);

    conectarDB.onsuccess = ()=> {
        // pasando la BD a una variable global
        DB = conectarDB.result;
    }
    conectarDB.onerror = ()=> {
        console.log('Hubo un error');
    }
}