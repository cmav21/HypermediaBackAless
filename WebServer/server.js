const express = require("express");
const app = express();
const hbs = require("hbs");
require('./hbs/helpers/helpers');

const port = process.env.PORT || 3000;

app.use( express.static(`${__dirname}/public`) );

hbs.registerPartials(`${__dirname}/views/parciales`);
app.set('view engine', 'hbs');
app.get('/', (req, res)=>{
//     let salida = {
//         nombre:'cesar',
//         edad:20,
//         url: req.url
//     }
//     // res.send('Hello world');
//     res.send(salida);
// //    middleware, filtra cualquier tipo de peticion
    res.render('home', {
        nombre: 'cesar',
        anio: new Date().getFullYear()
    }); 
});

app.get('/about', (req,res) => {
    res.render('about',{
        anio: new Date().getFullYear()
    })
})

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`)
});