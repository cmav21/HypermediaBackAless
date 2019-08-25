
process.env.PORT = process.env.PORT || 3000;

//Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// heroku config para ver variables de entorno de heroku
// heroku config:set VARIABLE="content";
//              :get
//              :unset

let urlDB = process.env.NODE_ENV === 'dev' ? "mongodb://localhost:27017/cafe" : process.env.MONGO_URI;

process.env.URLDB = urlDB;


//vencimiento token
//60 segundos
// 60 minutos
//  24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//seed token

process.env.SECRET_SEED = process.env.SECRET_SEED || 'secretSeed';


process.env.CLIENT_ID = process.env.CLIENT_ID || '938754991923-kbppgs0nlm731130c74e5f398abpoc7v.apps.googleusercontent.com';