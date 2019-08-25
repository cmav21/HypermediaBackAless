const express = require('express');

const sockerIO = require("socket.io");

const path = require('path');

const app = express();

const http = require("http");

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

let server = http.createServer(app);


app.use(express.static(publicPath));

module.exports.io = sockerIO(server);

require('./sockets/socket');

//IO = mantiene conexion direacta con el servidor

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});