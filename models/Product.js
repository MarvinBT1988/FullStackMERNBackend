const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    descripcion: { type: String},
    codigo: { type: String, required: [true, 'El código es obligatorio'],unique: [true, 'El código ya existe'] },
    marca: { type: String}    
});

module.exports = mongoose.model('Product', productSchema);