const Customer = require('../models/Customer');
require('dotenv').config();
exports.createCustomer = async (req, res) => {
    try {      
        const newCustomen = new Customer(req.body);
        await newCustomen.save();

        res.status(201).json({ msg: 'Cliente registrado exitosamente' });
    } catch (error) {
        // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            /*return res.status(400).json({
                ok: false,
                errores 
            });*/
            return res.status(400).json({
                message: errores
            });
        }
        if (error.code === 11000) {
           /* return res.status(400).json({
                ok: false,
                errores: ['El Cliente ya está registrado']
            });*/
             return res.status(400).json({
                message: 'El Cliente ya está registrado'
            });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const { DUI, nombre } = req.query;
        let query = {};
        if (nombre) query.nombre = { $regex: nombre, $options: 'i' };
        if (DUI) query.DUI = { $regex: DUI, $options: 'i' };

        const customers = await Customer.find(query).sort({ _id: -1 });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if(!customer) return res.status(404).json({msg: 'Cliente no encontrado'});
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: false });
        res.json(updatedCustomer);
    } catch (error) {
         // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                ok: false,
                errores 
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                errores: ['El DUI del Cliente ya está registrado']
            });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
