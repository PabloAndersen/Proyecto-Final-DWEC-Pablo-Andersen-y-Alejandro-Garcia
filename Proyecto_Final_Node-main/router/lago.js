const express = require('express');
const router = express.Router();
const Lago = require('../models/lago');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayLagoDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayLago que tenemos EN LA VISTA
        const arrayLagoDB = await Lago.find();
        res.render("lago", { 
            arrayLago: arrayLagoDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearLago', (req, res) => {
    res.render('crearLago')
})

router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    try {
        const lagoDB = new Lago(body) //Registrar un nuevo Lago, gracias al modelo
        await lagoDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/lago') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "lago.ejs" le pusimos
    //a este campo lago.id, por eso lo llamados con params.id
    try {
        const lagoDB = await Lago.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Lago” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        res.render('detalleLago', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            lago: lagoDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Lago no encontrado!'
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const lagoDB = await Lago.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        res.json({
            estado: true,
            mensaje: 'Lago editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el lago'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const lagoDB = await Lago.findByIdAndDelete({ _id: id });
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/lago') //Esto daría un error, tal y como podemos ver arriba
        if (!lagoDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el lago.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Lago eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})






module.exports = router;