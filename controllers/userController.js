const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar Usuario (Público)
exports.register = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, password,rol,status } = req.body;

        // Hashear password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ nombre, apellido, email, telefono, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: 'Usuario registrado exitosamente' });
    } catch (error) {
        // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                ok: false,
                errores 
            });
        }

        // 2. Manejar error de campo duplicado (Email unique)
        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                errores: ['El correo electrónico ya está registrado']
            });
        }
        res.status(500).json({ error: error.message });
    }
};

// Iniciar Sesión (Público)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ msg: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user._id, rol: user.rol, email: user.email }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '8h' });
        res.json({ token, msg: "Bienvenido " + user.nombre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};