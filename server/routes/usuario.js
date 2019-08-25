const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const Usuario = require('../models/usuario');
const app = express();
const { verificarToken, verificaAdminRol } = require('../middlewares/authentication');

app.get('/usuario', verificarToken ,(req, res)=>{
    
    // return res.json({
    //     usuario: req.usuario
    // });

    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;

    Usuario.find({estado: true}, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if(err) {
                return res.status(400).json({
                    ok:false,
                    err
                })
            }

            Usuario.countDocuments({estado: true}, (err, count) => {
                res.json({
                    ok: true,
                    usuarios,
                    total: count
                });
            })

        });
});

//Para agregar mas de dos middlewares es entre corchetes
app.post('/usuario', [verificarToken, verificaAdminRol] ,(req, res)=>{
    let body = req.body;

    //Crea una nueva instancia del usuario schema, pero se pueden pasar los parametros deseados
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //Esta funcion hace el hash de forma sincrona sin callbacks, etc, y el numero de vueltas al hash
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
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

app.put('/usuario/:id', [verificarToken, verificaAdminRol] ,(req, res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    // res.json(body);
    // funcion de mongoose para obtener un usuario de la db
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

app.delete('/usuario/:id', [verificarToken, verificaAdminRol] ,(req, res)=>{
    
    let id = req.params.id;

    //Esto para borrar el recibo fisicamente
    // Usuario.findByIdAndRemove(id, (err, usuario) => {
    //     if(err){
    //         res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if(!usuario) {
    //         res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: "Usuario no encontrado"
    //             }
    //         }); 
    //     }
    //     res.json({
    //         ok:true,
    //         usuario
    //     });
    // });

    //Eliminado logico
    let cambiaEstado = {
        estado: false
    };
    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, datosBorrados)=> {
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: datosBorrados
        });
    })

});

module.exports = app;