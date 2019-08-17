const argv = require("./config/yargs").argv;
const porHacer = require('./todo/porHacer');
const color = require("colors");

let comando = argv._[0];
 
switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.description);
        console.log(tarea);
        break;
    case 'listar':
            let listar = porHacer.getListado();
            for (const elemento of listar) {
                console.log("========".green);
                console.log(elemento.descripcion)
                console.log(elemento.completado)
            }
        break;
    case 'actualizar':
            let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
            console.log(actualizado)
            break;
    case 'borrar': 
            let borrado = porHacer.borrar(argv.descripcion);
            console.log(borrado);
        break;
    default:
        console.log("comando no es reconocido")
        break;
}