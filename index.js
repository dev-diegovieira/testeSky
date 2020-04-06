require('dotenv').config();

const express       = require('express'),
      app           = express(),
      cors          = require('cors');

app.use(express.json());
app.use(cors());


require('./src/app/controllers/index')(app);

app.all('*', function(req, res) {
    throw new Error("Bad request")
});

app.use(function(e, req, res, next) {
    if (e.message === "Bad request") {
        res.status(400).json({mensagem: 'O endpoint não existe'});
    }
});


const port = proces.env.PORT || 9000;
app.listen(port);

console.log('Servidor rodando na porta: ', port);