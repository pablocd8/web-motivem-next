import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  nombreArchivo: {
    type: String,
    required: true,
    unique: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  tamano: {
    type: Number,
    required: true,
  },
  pacienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true,
  },
  pacienteEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  subidoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true,
  },
}, {
  timestamps: true,
});

const Material = mongoose.models.Material || mongoose.model('Material', materialSchema, 'materiales');

export default Material;
