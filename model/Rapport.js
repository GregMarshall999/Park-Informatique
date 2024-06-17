const mongoose = require('mongoose');

const rapportSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false
  },
  facture: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Rapport', rapportSchema);