const mongoose = require('mongoose');
const horarioSchema = new mongoose.Schema(
    {
        alumno_id: {
            type: String
        },
        materias: {
            type: Object
        }
    }
)

const ModelHorario = mongoose.model("horarios", horarioSchema);
module.exports = ModelHorario;