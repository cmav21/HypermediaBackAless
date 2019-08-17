// const argv = require("yargs")
// .command('serve [port]', 'start the server', {
//     base:{
//         alias:'b',
//     },
//     altura:{
//         alias:'a',
//     }
//   })
//   .demandOption('base')
//   .default({
//     'base':10,
//     'altura':10
//   })
//   .help()
//   .argv

const argv = require("yargs")
    .command('lista', "listar tabla de multiplicar", {
        base:{
            alias: 'b',
            demand: true
        }
    })
    .help()
    .argv

let comando = argv._[0];
switch (comando) {
    case 'listar':
        console.log('listar');
        break;
    case 'crear':
        console.log('crear');
        break;
    default:
        console.log('comando no reconocido')
        break;
}