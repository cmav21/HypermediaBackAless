const argv = require("yargs")
    .command('crear', 'crear un elemento por hacer', {
        descripcion:{
            demand: true,
            alias: 'd',
            desc: 'Descripcion de la tarea por hacer'
        },
    })
    .command('actualizar', 'Actualiza el estado completo de una tarea', {
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'Descripcion de la tarea por hacer'
        },
        completado: {
            default: true,
            alias: 'c', 
            desc: 'Marca como completado o pendiente la tarea'
        }
    })
    .command('borrar', 'Elimina una tarea', {
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'Elimina una tarea'
        }
    })
    .help()
    .argv;

    module.exports = {
        argv
    }