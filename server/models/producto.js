var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Se declara schema de producto
var productoSchema = new Schema({
    nombre: { type: String, 
        // Se indica que es obligatorio y se establece un mensaje en caso de error
        required: [true, 'El nombre es necesario'] 
    },
    precioUni: { type: Number, required: [true, 'El precio únitario es necesario'] },
    descripcion: { type: String, required: false },
    disponible: { type: Boolean, required: true, default: true },
    categoria: { 
        //Se indica que el tipo es objectId ya que es una referencia a categorias
        type: Schema.Types.ObjectId, 
        ref: 'Categoria', required: true 
    },
    usuario: { 
        //De igual forma con la referencia al usuario
        type: Schema.Types.ObjectId, 
        ref: 'Usuario' 
    },
    img: {
        type: String,
        required: false
    }
});

//Se crea y exporta el modelo
module.exports = mongoose.model('Producto', productoSchema);