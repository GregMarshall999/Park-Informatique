const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  prenom: {
    type: String,
    required: false
  },
  nom: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  nom_utilisateur: {
    type: String,
    required: true,
    unique: true
  },
  motdepasse: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);