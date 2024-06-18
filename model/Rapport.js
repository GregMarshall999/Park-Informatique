const mongoose = require('mongoose');

const rapportSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false
  },
  facture: {
    type: Number,
    required: true
  }, 
  interventionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Intervention',
    required: true
  },
  technicienId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  }
});

module.exports = mongoose.model('Rapport', rapportSchema);