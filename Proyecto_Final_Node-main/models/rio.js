const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rioSchema = new Schema({
    nombre: String,
    ubicacion: String,
    longitud: String,
    numero_personas: String
});

//Crear modelo
const Rio = mongoose.model('rio', rioSchema, "rio");


module.exports = Rio;