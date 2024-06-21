require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createCrudRoutes = require('./routes/crudHandler');
const authRoutes = require('./routes/auth');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const secret = process.env.JWT_SECRET;

//ajout de middleware
app.use(bodyParser.json());
app.use(cors());

//connection a DB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Ajout des Models
const Appareil = require('./model/Appareil');
const Intervention = require('./model/Intervention');
const Rapport = require('./model/Rapport');
const Utilisateur = require('./model/Utilisateur');

//gestion des routes
app.use('/api/appareil', authenticateToken, createCrudRoutes(Appareil));
app.use('/api/intervention', createCrudRoutes(Intervention));
app.use('/api/rapport', createCrudRoutes(Rapport));
app.use('/api/utilisateur', createCrudRoutes(Utilisateur));
app.use('/api/auth', authRoutes);

app.get('/api/appareil/owner/:ownerId', authenticateToken, async (req, res) => {
  try {
    const equipements = await Appareil.find({ proprietaireId: req.params.ownerId });
    res.json(equipements);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});