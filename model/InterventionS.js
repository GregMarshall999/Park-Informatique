const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const AppareilS = require('./AppareilS');
const UtilisateurS = require('./UtilisateurS');

const InterventionS = sequelize.define('Intervention', {
    date_debut: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_fin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    appareilId: {
        type: DataTypes.INTEGER,
        references: {
            model: AppareilS,
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

module.exports = InterventionS;