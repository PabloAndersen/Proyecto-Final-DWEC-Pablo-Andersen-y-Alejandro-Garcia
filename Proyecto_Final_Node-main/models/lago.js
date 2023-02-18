const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lagoSchema = new Schema({
    nombre: String,
    ubicacion: String,
    longitud: String,
    numero_personas: String
});

//Crear modelo
const Lago = mongoose.model('lago', lagoSchema, "lago");


module.exports = Lago;