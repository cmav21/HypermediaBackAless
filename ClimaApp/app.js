const {getLugarLatitudYLongitud} = require('./lugar/lugar');

const argv = require("yargs")
    .options({
        direccion:{
            alias: 'd',
            desc: 'direccion de la ciudad para obtener el clima',
            demand: true
        }
    }).argv;

getLugarLatitudYLongitud(argv.direccion)
    .then(res => console.log(res))
    .catch(err => console.log(err))