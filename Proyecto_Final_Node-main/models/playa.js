const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playaSchema = new Schema({
    nombre: String,
    ubicacion: String,
    longitud: String,
    numero_personas: String
});

//Crear modelo
const Playa = mongoose.model('playa', playaSchema, "playa");


module.exports = Playa;