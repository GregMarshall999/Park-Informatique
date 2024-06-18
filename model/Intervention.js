const mongoose = require('mongoose');

const interventionSchema = new mongoose.Schema({
  date_debut: {
    type: Date,
    required: true
  },
  date_fin: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: false
  }, 
  appareilId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appareil',
    required: true
  },
  technicienId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur', 
    required: false
  }
});

module.exports = mongoose.model('Intervention', interventionSchema);