const mongoose = require('mongoose');

const appareilSchema = new mongoose.Schema({
  marque: {
    type: String,
    required: true
  },
  modele: {
    type: String,
    required: true
  },
  etat: {
    type: String,
    required: true, 
    enum: ['en service', 'en panne', 'en maintenance']
  }, 
  proprietaireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  }
});

module.exports = mongoose.model('Appareil', appareilSchema);