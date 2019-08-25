
// io es una variable que se crea con los sockets 

var socket = io();

//Notificara que se tiene una conexion abierta
socket.on('connect', function(){
    console.log("Conectado en el se4rvidor")
});

socket.on('disconnect', function(){
    //En caso de que un usuario se desconecte
    console.log("Perdimos conexion con el servidor");
});

//Los emit son para enviar informacion
//Los on son para escuchar sucesos o eventos
//Lo mas comun es enviar un objeto, cuando se tenga la conexion se emitira lo siguiente
//El emit unicamente envia mensajes al servidor
socket.emit('enviarMensaje', {
    usuario: 'César',
    mensaje: 'Hola mundo'
},function(resp){
    console.log("respuesta server:", resp);
});

//Lo de arriba es la verificacion de si el mensaje se envio de forma correcta

//Escuchar informacion
socket.on('enviarMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});