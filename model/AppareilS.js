const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const UtilisateurS = require('./UtilisateurS');

const AppareilS = sequelize.define('AppareilS', {
    marque: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modele: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    etat: {
        type: DataTypes.ENUM('en service', 'en panne', 'en maintenance'),
        allowNull: false,
    },
    proprietaireId: {
        type: DataTypes.INTEGER,
        references: {
            model: UtilisateurS,
            key: 'id',
        },
    },
});

module.exports = AppareilS;