const express = require('express');
const router = express.Router();
const Socio = require('../models/socio');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arraySocioDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arraySocio que tenemos EN LA VISTA
        const arraySocioDB = await Socio.find();
        res.render("socio", { 
            arraySocio: arraySocioDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearSocio', (req, res) => {
    res.render('crearSocio')
})

router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    try {
        const socioDB = new Socio(body) //Registrar un nuevo Socio, gracias al modelo
        await socioDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/socio') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "socio.ejs" le pusimos
    //a este campo socio.id, por eso lo llamados con params.id
    try {
        const socioDB = await Socio.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable "Socio" está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        res.render('detalleSocio', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            socio: socioDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Socio no encontrado!'
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const socioDB = await Socio.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        res.json({
            estado: true,
            mensaje: 'Socio editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el socio'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const socioDB = await Socio.findByIdAndDelete({ _id: id });
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/socio') //Esto daría un error, tal y como podemos ver arriba
        if (!socioDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el socio.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Socio eliminada.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})






module.exports = router;