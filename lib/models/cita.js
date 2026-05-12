import mongoose from 'mongoose';

const citaSchema = new mongoose.Schema({
  nombrePaciente: {
    type: String,
    required: true,
    trim: true,
  },
  emailPaciente: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  telefonoPaciente: {
    type: String,
    required: true,
  },
  fechaHora: {
    type: Date,
    required: true,
  },
  duracion: {
    type: Number,
    default: 60,
  },
  servicio: {
    type: String,
    enum: ['Psicoterapia individual', 'Psicoterapia de pareja', 'Psicopedagogía'],
    required: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada', 'completada'],
    default: 'pendiente',
  },
  notas: {
    type: String,
    trim: true,
  },
  recordatorioEnviado: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});


const Cita = mongoose.models.Cita || mongoose.model('Cita', citaSchema, 'citas');

export default Cita;
