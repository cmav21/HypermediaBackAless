const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', (req, res)=>{
    res.json("get usuario local");
});

app.post('/usuario', (req, res)=>{
    let body = req.body;

    //Crea una nueva instancia del usuario schema, pero se pueden pasar los parametros deseados
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //Esta funcion hace el hash de forma sincrona sin callbacks, etc, y el numero de vueltas al hash
        password: bcrypt.hashSync(body.password, 10),
        role: body.rol
    });

    //Guardar registro en db, recibes un error o bien el usuario guardado
    usuario.save( (err, usuarioDB) => {
        if(err) {
            //Se establecec el estatus de la respuesta en caso de error
            return res.status(400).json({
                ok:false,
                error:err,
            });
        }

        res.json({
            ok:true,
            usuario: usuarioDB
        });
    })
});

app.put('/usuario/:id', (req, res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'rol', 'estado']);
    
    //funcion de mongoose para obtener un usuario de la db
    Usuario.findByIdAndUpdate(id, body, {new:true, runValidators: true} ,(err, usuarioDB)=>{
    //con run validators indico que corra las valifaciones que se indican en el schema
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario', (req, res)=>{
    res.json("delete usuario");
});

module.exports = app;