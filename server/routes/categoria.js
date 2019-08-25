const express = require("express");
//Se exportan las funciones del middleware
const { verificarToken, verificaAdminRol } = require('../middlewares/authentication');

const app = express();
//Se exporta el modelo
const Categoria = require('../models/catergoria');

app.use(express.json());

//mostrar categorias
app.get('/categoria', verificarToken, (req, res) => {
    // populate indica que datos cargar
    //sort los ordena dependiendo de un cmapo
    //exect, es la parte del callback, se puso por separado para agregar los filtros de sort y populate
    Categoria.find({})
    .sort('descripcion')
    .populate('usuario', 'nombre')
    .exec((err, categorias) => {
        if(err){
            return res.status(500).json({
               ok: false,
               err
            });
        }

        res.json({
            ok: true,
            categorias
        });
    });

});

//Encontrar por id
app.get('/categoria/:id', verificarToken, (req, res)=> {
    let id = req.params.id;
    Categoria.findById(id, (err, categoria) => {
        if(err){
            return res.status(500).json({
               ok: false,
               err
            });
        }

        if(!categoria){
            return res.status(500).json({
                ok: true,
                err
             });
        }

        res.json({
            ok: true,
            categoria
        });
    });


});

app.post('/categoria', verificarToken, (req, res) => {
    let body = req.body;
    //Para hacer el push de nuetra categoria, creamos el objeto de nuestro modelo
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    //Guardamos y validamos
    categoria.save((err, categoria) => {
        if(err){
            return res.status(500).json({
               ok: false,
               err
            });
        }

        if(!categoria){
            return res.status(500).json({
                ok: true,
                err
             });
        }

        res.json({
            ok: true,
            categoria
         });
    })
});

app.put('/categoria/:id', verificarToken, (req, res) => {
    //Solo un adminstrador puede borrar una categoria
    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndUpdate(id, {
        descripcion: body.descripcion,
    }, {
        //Esto indica que te devolvera el nuevo objeto creado
        new: true,
        //indica que se ejecutaran las validaciones establecidas en el modelo
        runValidators: true
    }, (err, categoria) => {
        if(err){
            return res.status(500).json({
               ok: true,
               err
            });
        }

        if(!categoria){
            return res.status(500).json({
                ok: false,
                err
             });
        }

        res.json({
            ok: true,
            categoria
         });
    })
});

app.delete('/categoria/:id', [verificarToken,verificaAdminRol], (req, res) => {
    //Solo un adminstrador puede borrar una categoria
    let id = req.params.id;
    
    Categoria.findOneAndRemove(id, (err, categoria)=> {
        if(err){
            return res.status(500).json({
               ok: true,
               err
            });
        }

        if(!categoria){
            return res.status(500).json({
                ok: true,
                err
             });
        }

        res.json({
            ok: true,
            categoria
         });
    })
});



module.exports = app;
