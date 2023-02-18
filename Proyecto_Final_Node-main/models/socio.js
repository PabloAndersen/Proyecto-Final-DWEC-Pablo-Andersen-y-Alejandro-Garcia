const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socioSchema = new Schema({
    nombre: String,
    apellidos: String,
    dni: String,
    telefono: String,
    direccion: String,
    codigo_postal: String
});

//Crear modelo
const Socio = mongoose.model('socio', socioSchema, "socio");


module.exports = Socio;