const express = require('express');
const router = express.Router();
const Playa = require('../models/playa');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPlayaDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPlaya que tenemos EN LA VISTA
        const arrayPlayaDB = await Playa.find();
        res.render("playa", { 
            arrayPlaya: arrayPlayaDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearPlaya', (req, res) => {
    res.render('crearPlaya')
})

router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    try {
        const playaDB = new Playa(body) //Registrar un nuevo Playa, gracias al modelo
        await playaDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/playa') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "playa.ejs" le pusimos
    //a este campo playa.id, por eso lo llamados con params.id
    try {
        const playaDB = await Playa.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Playa” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        res.render('detallePlaya', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            playa: playaDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Playa no encontrada!'
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const playaDB = await Playa.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        res.json({
            estado: true,
            mensaje: 'Playa editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Playa'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const playaDB = await Playa.findByIdAndDelete({ _id: id });
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/playa') //Esto daría un error, tal y como podemos ver arriba
        if (!playaDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el playa.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Playa eliminada.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})






module.exports = router;