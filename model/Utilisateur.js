const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  }, 
  typeUtilisateur: {
    type: String, 
    required: true, 
    enum: ['admin', 'client', 'technicien']
  }
});

utilisateurSchema.pre('save', async function (next) {
  if (this.isModified('motdepasse')) {
    this.motdepasse = await bcrypt.hash(this.motdepasse, 10);
  }
  next();
});

utilisateurSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.motdepasse);
};

module.exports = mongoose.model('Utilisateur', utilisateurSchema);