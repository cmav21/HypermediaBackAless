import { get } from "https";

process.env.PORT = process.env.PORT || 3000;

//Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// heroku config para ver variables de entorno de heroku
// heroku config:set VARIABLE="content";
//              :get
//              :unset

let urlDB = process.env.NODE_ENV === 'dev' ? "mongodb://localhost:27017/cafe" : process.env.MONGO_URI;

process.env.URLDB = urlDB;