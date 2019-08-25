require('./condif/config');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//habilitar carpeta public

app.use(express.static(`${__dirname}/../public`));

//el poath obtiene el path que se busca
console.log(path.resolve(__dirname, '../public'));
// app.use(express.json());
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: false
} ,(err, res) => {
    if(err) throw err;
    console.log("Base de datos online");    
});

app.listen(process.env.PORT, ()=>{
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});