const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuario) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        if(!usuario) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }
        if(!bcrypt.compareSync(body.password, usuario.password)) {
            return res.status(400).json({
                ok: false,
                error: {
                    mensaje: "Usuario o contraseña incorrectos",
                }
            });
        }

        let token = jwt.sign({
            usuario,

        }, process.env.SECRET_SEED, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        });
        //60 s * 60 min * 24 horas * 30 dias

        res.json({
            ok: true,
            usuario,
            token
        });
    });
});

module.exports = app;