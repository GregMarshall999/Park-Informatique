const express = require('express');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../model/Utilisateur');
const router = express.Router();

const secret = 'cle_jwt_random';

router.post('/login', async (req, res) => {
    const { nom_utilisateur, motdepasse } = req.body;
  
    try {
      const user = await Utilisateur.findOne({ nom_utilisateur });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      const isMatch = await user.comparePassword(motdepasse);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      const token = jwt.sign({ 
            id: user._id, 
            username: user.nom_utilisateur 
        }, secret, { expiresIn: '1h' });
      res.json({ token, 
        user: { 
            prenom: user.prenom, 
            nom: user.nom, 
            nom_utilisateur: user.nom_utilisateur, 
            typeUtilisateur: user.typeUtilisateur } });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;