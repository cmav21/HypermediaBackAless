const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
//obtenermos el cascaron para crear schemas de mongoose
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    //Value es el valor de lo que incresa el usuario
    message: '{VALUE} no es un rol valido'
};

//Se declara un nuevo schema
//Se definen las reglas y campos
let usuarioSchema = new Schema({
    nombre:{
        type: String,
        //Se agrega un mensaje perzonalizado en lugar de uno por defecto
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String,
        required: false
    },
    rol:{
        type: String,
        default: 'USER_ROLE',
        //indica que el rol debe existir dentro de esta enumeracion
        enum: rolesValidos
    },
    estado:{
        type: Boolean, 
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

//Se indica al schema que use un plugin
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
})

//Asi se exporta el schema de la base de datos
let m = mongoose.model('usuario', usuarioSchema);

module.exports = mongoose.model('Usuario', usuarioSchema);

