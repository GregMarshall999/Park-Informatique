const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createCrudRoutes = require('./routes/crudHandler');
const authRoutes = require('./routes/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');

const app = express();

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

//Route de connexion
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Nom d`Utilisateur ou mot de passe Invalide' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Nom d`Utilisateur ou mot de passe Invalide' });

    const token = jwt.sign({ userId: user._id }, 'jwt_secret'); //a tester
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ajout des Models
const Appareil = require('./model/Appareil');
const Intervention = require('./model/Intervention');
const Rapport = require('./model/Rapport');
const Utilisateur = require('./model/Utilisateur');

//gestion des routes
app.use('/api/appareil', createCrudRoutes(Appareil));
app.use('/api/intervention', createCrudRoutes(Intervention));
app.use('/api/rapport', createCrudRoutes(Rapport));
app.use('/api/utilisateur', createCrudRoutes(Utilisateur));
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});