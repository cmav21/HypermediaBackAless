
process.env.PORT = process.env.PORT || 3000;

//Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB = process.env.NODE_ENV === 'dev' ? "mongodb://localhost:27017/cafe" : "mongodb://cesar:password1@ds031903.mlab.com:31903/cafeudemy";

process.env.URLDB = urlDB;