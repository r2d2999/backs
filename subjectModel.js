const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        codigo: {
            type: String,
            required: true
        },
        creditos: {
            type: Number,
            required: true
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
        cupos: { 
            type: Number,
            required: true 
        },
        profesores: { 
            profesor1: { type: String },
            profesor2: { type: String }
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const subjectModel = mongoose.model("materias", subjectSchema);
module.exports = subjectModel;
