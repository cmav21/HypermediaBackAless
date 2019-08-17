const express = require("express");
const router = require("./routes/routes");

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.use('/api',router);

module.exports = app;