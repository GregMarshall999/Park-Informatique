const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const InterventionS = require('./InterventionS');
const UtilisateurS = require('./UtilisateurS');

const RapportS = sequelize.define('RapportS', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    facture: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    interventionId: {
        type: DataTypes.INTEGER,
        references: {
            model: InterventionS,
            key: 'id',
        },
    },
    technicienId: {
        type: DataTypes.INTEGER,
        references: {
            model: UtilisateurS,
            key: 'id',
        },
    },
});

module.exports = RapportS;