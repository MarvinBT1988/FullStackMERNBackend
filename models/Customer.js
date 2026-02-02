const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    direccion: { type: String},
    DUI: { 
         type: String,
         required: [true, 'El DUI es obligatorio'],
         unique: [true, 'El DUI ya existe'],
         trim: true,
         match: [/^\d{8}-\d{1}$/, 'Por favor, ingresa un formato de DUI válido (00000000-0)']
       },
    telefono: { type: String}    
});

module.exports = mongoose.model('Customer', CustomerSchema);