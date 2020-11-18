const mongoose = require ('mongoose');

const livroSchema = mongoose.Schema ({
    titulo: {type: String, required: true},
    autor: {type: String, required: false},
    id: {type: String, required: true},
    paginas: {type: String, required: true}
});
module.exports = mongoose.model('Livro', livroSchema);