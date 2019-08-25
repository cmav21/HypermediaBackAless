const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const fs = require('fs');
const path = require('path');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
//Transforma lo que se sube y lo guarda en un objeto llamado files
app.use(fileUpload({useTempFilesd: true}));

app.put('/upload/:tipo/:id', (req, res)=> {
   
    let tipo = req.params.tipo;
    let id = req.params.id;
   
    //El files tiene los archivos en caso de subirse
    if(Object.keys(req.files).length == 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: "No se ha seleccionado ningun archivo"
            }
        });
    }

    //validar tipos
    let tiposValidos = ['productos', 'usuarios'];
    if(tiposValidos.indexOf(tipo) < 0){
        return res.status(400).json({
            ok:false,
            err: {
                message: `Los tipos permitidos son ${tiposValidos.join(', ')}`,
                tipo
            }
        })
    }

    //Archivo es el nombre que se le da cuando se hace un input  
    let archivo = req.files.archivo;
    let nombreArchivo = archivo.name.split('.');
    let extension = nombreArchivo[nombreArchivo.length-1];

    //Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if(extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok:false,
            err: {
                message: `La extension o extensiones permitidas son ${extensionesValidas.join(', ')}`,
                extension
            }
        })
    }
    
    //Cambiar nombre al archivo
    let filename = `${id}-${new Date().getMilliseconds()}.${extension}`;

    //mueve el archivo al directorio que queremos
    archivo.mv(`uploads/${tipo}/${filename}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        //Imagen cargada
        if(tipo === 'usuarios'){
            imagenUsuario(id, res, filename);
        } else {
            imagenProducto(id, res, filename);
        }
        // res.json({
        //     ok: true, 
        //     message: "Imagen subida correctamente"
        // });
    });
});

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuario) => {
        if(err) {
            borrarArchivo(nombreArchivo, 'usuarios')
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!usuario){
            borrarArchivo(nombreArchivo, 'usuarios')
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El usuario no existe"
                }
            });
        }

        borrarArchivo(usuario.img, 'usuarios')

        usuario.img = nombreArchivo;
        usuario.save((err, usuario) => {
            res.json({
                ok: true,
                usuario,
                img: nombreArchivo
            });
        })
    })
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, producto) => {
        if(err) {
            borrarArchivo(nombreArchivo, 'productos')
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!producto){
            borrarArchivo(nombreArchivo, 'productos')
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El usuario no existe"
                }
            });
        }

        borrarArchivo(producto.img, 'productos');

        producto.img = nombreArchivo;
        producto.save((err, producto) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "El usuario no existe",
                        err
                    }
                });
            }
            res.json({
                ok: true,
                producto,
                img: nombreArchivo
            });
        })

    })
}

function borrarArchivo(nombreImagen, tipo) {
    let pathUrl = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    console.log(pathUrl);
    if(fs.existsSync(pathUrl)) {
        fs.unlinkSync(pathUrl);
    }
}

module.exports = app;