const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createCrudRoutes = require('./routes/crudHandler');

const app = express();

//ajout de bodyparser
app.use(bodyParser.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});