const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        tipo: {
            type: String
        },
        inscrito: {
            type: Boolean,
            default: false
        },
        horario: {
            type: Boolean,
            default: false
        },
        horarioLaboral: {
            Lunes: [
                { horaInicio: { type: String, default: "08:00" }, horaFin: { type: String, default: "14:00" } }
            ],
            Martes: [
                { horaInicio: { type: String, default: "08:00" }, horaFin: { type: String, default: "14:00" } }
            ],
            Miércoles: [
                { horaInicio: { type: String, default: "08:00" }, horaFin: { type: String, default: "14:00" } }
            ],
            Jueves: [
                { horaInicio: { type: String, default: "08:00" }, horaFin: { type: String, default: "14:00" } }
            ],
            Viernes: [
                { horaInicio: { type: String, default: "08:00" }, horaFin: { type: String, default: "14:00" } }
            ]
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ModelUser = mongoose.model("users", userSchema);
module.exports = ModelUser;
