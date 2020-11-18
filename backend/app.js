const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Livro = require('./models/livro')

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://user:<password>L0507@cluster0.rzu8o.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Conexão OK!");
    }).catch((error) => {
        console.log("Conexão não funcionou!");
        console.log(error);
    })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

    next();
});

app.get('/api/livros', (req, res, next) => {
    Livro.find().then(
        documents => {
            res.status(200).json(
                {
                    mensagem: "Tudo OK",
                    livros: documents
                }
            );
        }
    );
});

app.post('/api/livros', (req, res, next) => {
    const livro = new Livro({
        titulo: req.body.titulo,
        autor: req.body.autor,
        id: req.body.id,
        paginas: req.body.paginas
    });

    livro.save()
        .then(livroInserido => {
            res.status(201).json({
                mensagem: 'Livro inserido',
                id: livroInserido._id
            })
        })
});

app.delete('/api/livros/:id', (req, res, next) => {

    Livro.deleteOne({ _id: req.params.id }).then((resultado) => {
        console.log(resultado);
        res.status(200).json({ mensagem: "Livro removido" })
    });
});

app.put("/api/livros/:id", (req, res, next) => {

    const livro = new Livro({
        _id: req.params.id,
        titulo: req.body.titulo,
        autor: req.body.autor,
        id: req.body.id,
        paginas: req.body.paginas

    });

    Livro.updateOne({
        _id: req.params.id
    },
        livro
    ).then((resultado) => {
        console.log(resultado);
    });
    res.status(200).json({
        mensagem: 'Atualização realizada com sucesso!'
    });

});

module.exports = app;
