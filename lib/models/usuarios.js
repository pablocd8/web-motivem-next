import mongoose from 'mongoose';

const usuariosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  rol: {
    type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario'
  }
}, {
  timestamps: true
});

// Prevent model recompilation in hot-reload
const Usuario = mongoose.models.Usuarios || mongoose.model('Usuarios', usuariosSchema, 'usuarios');

export default Usuario;
