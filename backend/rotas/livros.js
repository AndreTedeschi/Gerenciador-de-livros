const express = require ('express');
const router = express.Router();
const Livro = require('../models/livro');

router.delete('/:id', (req, res, next) => {
  Livro.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Livro removido" });
  })
})


router.get('', (req, res, next) => {
  Livro.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      livros: documents
    });
  })
});

router.get('/:id', (req, res, next) => {
  Livro.findById(req.params.id).then(liv => {
    if (liv) {
      res.status(200).json(liv);
    }
    else
      res.status(404).json({ mensagem: "Não há nenhum livro!" })
  })
});


router.post('', (req, res, next) => {
  const livro = new Livro({
    titulo: req.body.titulo,
    autor: req.body.autor,
    paginas: req.body.paginas
  })
  livro.save().then(livroInserido => {
    console.log(livroInserido);
    res.status(201).json({ mensagem: 'Livro inserido', id: livroInserido._id })
  });
});



router.put("/:id", (req, res, next) => {
  const livro = new Livro({
    _id: req.params.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    params: req.body.paginas
  });
  Livro.updateOne({ _id: req.params.id }, livro)
    .then((resultado) => {
      console.log(resultado)
    });
  res.status(200).json({ mensagem: 'Livro atualizado' })
});

module.exports = router;
