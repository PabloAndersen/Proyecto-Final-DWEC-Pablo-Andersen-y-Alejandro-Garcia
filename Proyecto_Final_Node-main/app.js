const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config()
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const router = require('./router/rutasweb');

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

//Conexión a base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.02ps7zh.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))

//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');

app.use(express.static(__dirname + "/public"));

app.use('/', require('./router/rutasweb'));
app.use('/rio', require('./router/rio'));
app.use('/lago', require('./router/lago'));
app.use('/playa', require('./router/playa'));
app.use('/socio', require('./router/socio'));

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Titulo del sitio web"
    })
})

app.listen(PORT, () => {
    console.log('servidor a su servicio en el puerto '+PORT)
})