const mongoose = require('mongoose');

const dbconnect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/escuela");
        console.log("Conexión exitosa a la db");
    } catch (err) {
        console.error("Error de conexión", err);
    }
};

module.exports = dbconnect;
