//El client es toda la configuracion del equipo
const {io} = require('../server')

io.on('connection', (client) => {

    console.log("Usuario conectado");

    //Emitir mensaje para el cliente
    client.emit('enviarMensaje', {
        usuario:' admin',
        mensaje: 'Bienvenido a esta aplicacion'
    });

    //cuando el cliente se desconecta de la aplicacion, cierra la ventana, etc
    client.on('disconnect', () => {
        console.log("Usuario desconectado");
    });

    //Se especifica el enviar mensaje, escuchar al cliente
    //Se escucha el evento
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);

        //Se envia el mensaje a todos los usuarios
        // client.emit('enviarMensaje', data);

        //Esto lo envia a todos los usuarios conectados a la aplicacion
        client.broadcast.emit('enviarMensaje', data);

        // if(mensaje.usuario){
        //     //Se manda a llamar el callback con el resultado del emit
        //     callback({
        //         resp: "Todo salio bien"
        //     });
        // } else {
        //     callback({
        //         respo: "Todo salio mal"
        //     })
        // }
    });
});
