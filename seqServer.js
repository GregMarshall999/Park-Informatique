const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');

const sequelize = require('./sequelize');
const createCrudRoutes = require('./routes/seqCRUDHandler');

const Utilisateur = require('./model/UtilisateurS');
const Appareil = require('./model/AppareilS');
const Intervention = require('./model/InterventionS');
const Rapport = require('./model/RapportS');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sync database
sequelize.sync().then(() => {
    console.log('Database synced');
});

// Authentication route
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret');
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Models and CRUD routes
app.use('/api/utilisateurS', createCrudRoutes(Utilisateur));
app.use('/api/appareilS', createCrudRoutes(Appareil));
app.use('/api/interventionS', createCrudRoutes(Intervention));
app.use('/api/rapportS', createCrudRoutes(Rapport));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});