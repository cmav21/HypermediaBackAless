const jwt = require("jsonwebtoken");

// verificar token
//El next contua con la ejecucion del programa
const verificarToken = (req, res, next) => {
    //con testo se obtienen los headers 
    let token = req.get('token');

    //verify recibe el token, el seed y un callbacl
    jwt.verify(token, process.env.SECRET_SEED, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                ok: false,
                error: {
                    message: "Token no valido"
                }
            });
        }

        //Le podemon mandar al controlador cualquier informacion ddecodificada del payload
        //Estamon mandando el usuario
        req.usuario = decoded.usuario;
        next();

    });
};

//Verifica token pra imagen

let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;
    
    jwt.verify(token, process.env.SECRET_SEED, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                ok: false,
                error: {
                    message: "Token no valido"
                }
            });
        }
        next();
    })
}

//verifica el rol del usuario
let verificaAdminRol = (req, res, next) => {
    const token = req.get('token');

    jwt.verify(token, process.env.SECRET_SEED, (err, decoded) => {
        const usuario = decoded.usuario;
        if(usuario.rol !== "ADMIN_ROLE") {
            return res.status(401).json({
                ok: false,
                error: {
                    message: "No autorizado"
                }
            });
        }

        next();
    })
}

//Exporta la funciones por medio de un objeto
module.exports = {
    verificarToken,
    verificaAdminRol,
    verificaTokenImg
};


