const express = require('express');
const router = express.Router();
const Rio = require('../models/rio');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayRioDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayRio que tenemos EN LA VISTA
        const arrayRioDB = await Rio.find();
        res.render("rio", { 
            arrayRio: arrayRioDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearRio', (req, res) => {
    res.render('crearRio')
})

router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    try {
        const rioDB = new Rio(body) //Registrar un nuevo Rio, gracias al modelo
        await rioDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/rio') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "rio.ejs" le pusimos
    //a este campo rio.id, por eso lo llamados con params.id
    try {
        const rioDB = await Rio.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Rio” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        res.render('detalleRio', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            rio: rioDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Rio no encontrado!'
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const rioDB = await Rio.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        res.json({
            estado: true,
            mensaje: 'Rio editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el rio'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const rioDB = await Rio.findByIdAndDelete({ _id: id });
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/rio') //Esto daría un error, tal y como podemos ver arriba
        if (!rioDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el rio.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Rio eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})






module.exports = router;