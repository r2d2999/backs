const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subjects: { type: Object, required: true } // Campo subjects como un objeto genérico
});

const Student = mongoose.model('students', studentSchema);

module.exports = Student;
