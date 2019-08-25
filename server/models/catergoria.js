
//Para declarar un schema de mongoose de ejecuta mongoose.Schema 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creando nuevo esquema con sus propiedades
const categoriaSchema = new Schema({
    descripcion:{
        type: String,
        unique: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        //Indica que tiene una referencia al modelo de usuarios
        ref: 'Usuario'
    }
});

//Se crea y exporta el modelo
module.exports = mongoose.model('Categoria', categoriaSchema);