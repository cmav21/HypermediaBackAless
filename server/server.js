const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('./condif/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// app.use(express.json());

app.get('/usuario', (req, res)=>{
    res.json("get usuario");
});

app.post('/usuario', (req, res)=>{
    let body = req.body;
    if(body.nombre === undefined) {
        res.status(400).json({
            ok:false,
            message: "El nombre es necesario"
        })
    } else {
        res.json({
            persona: body
        });
    }

});

app.put('/usuario/:id', (req, res)=>{
    let id = req.params.id;
    console.log(req.body);
    res.json({
        body: req.body
    });
});

app.delete('/usuario', (req, res)=>{
    res.json("delete usuario");
});

app.listen(process.env.PORT, ()=>{
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});