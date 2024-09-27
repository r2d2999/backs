const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        profesor: {
            type: String
        },
        cupo:{
            type: Number
        },
        materia: {
            type: String
        },
        horario: {
            Lunes: {
                horaInicio: { type: String },
                horaFin: { type: String }
            },
            Martes: {
                horaInicio: { type: String },
                horaFin: { type: String }
            },
            Miércoles: {
                horaInicio: { type: String },
                horaFin: { type: String }
            },
            Jueves: {
                horaInicio: { type: String },
                horaFin: { type: String }
            },
            Viernes: {
                horaInicio: { type: String },
                horaFin: { type: String }
            }
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ModelGroup = mongoose.model("groups", groupSchema);
module.exports = ModelGroup;