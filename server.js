const express = require('express');
const connectDB = require('./config/mongoConfig');

const app = express();

// 1. Conectar BD
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://127.0.0.1:${PORT}`);
});
