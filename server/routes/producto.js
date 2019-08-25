const express = require("express");

const { verificarToken } = require('../middlewares/authentication');

const app = express();

const Producto = require('../models/producto');

//obtener prodctos

app.get('/productos', verificarToken, (req, res) => {
    let desde = Number(req.query.desde) || 0;

    Producto.find({disponible: true})
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .skip(5)
    .limit(limite)
    .exec((err, productos) => {
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }  
    
        Producto.countDocuments({}, (err, total) => {
            res.json({
                ok: true,
                productos,
                total
            });
        })
    });
});

app.get('/productos/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
    .populate('categoria', 'descripcion')
    .exec((err, producto) => {
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }  

        if(!producto){
            return res.status(500).json({
                ok: true,
                err
             });
        }
    
        res.json({
            ok: true,
            producto,
        });
    });
});

app.get('/productos/buscar/:termino', verificarToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({nombre: regex})
    .populate('categoria', 'nombre')
    .exec((err, productos) => {
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }  
    
        res.json({
            ok: true,
            productos,
            total
        });
    })
});

app.post('/productos', verificarToken, (req, res) => {
    let body = req.body;
    const producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: body.usuario
    });
    
    producto.save((err, producto) => {
        if(err){
            return res.status(500).json({
               ok: false,
               err
            });
        }

        if(!producto){
            return res.status(500).json({
                ok: true,
                err
             });
        }

        res.json({
            ok: true,
            producto
         });
    });

});

app.put('/productos/:id',verificarToken, (req, res) => {
    let body = req.body;
    let id = req.params.id;
    const producto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: body.usuario
    };

    Producto.findByIdAndUpdate(id, producto, {new: true, runValidators: true}, (err, producto) => {
        if(err){
            return res.status(500).json({
               ok: true,
               err
            });
        }

        if(!producto){
            return res.status(500).json({
                ok: false,
                err
             });
        }

        res.json({
            ok: true,
            producto
         });
    });
    
});

app.delete('/productos:id', verificarToken,(req, res) => {
    let id = req.params.id
    Producto.findByIdAndUpdate(id, { disponible: false }, {new: true, runValidators: true}, (err, producto) => {
        if(err){
            return res.status(500).json({
               ok: true,
               err
            });
        }

        if(!producto){
            return res.status(500).json({
                ok: false,
                error: {
                    message: "El id no existe"
                }
             });
        }

        res.json({
            ok: true,
            producto
         });
    });
});

module.exports = app;