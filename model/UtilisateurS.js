const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const UtilisateurS = sequelize.define('UtilisateurS', {
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nom_utilisateur: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    motdepasse: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    typeUtilisateur: {
        type: DataTypes.ENUM('admin', 'client', 'technicien'),
        allowNull: false,
    },
});

module.exports = UtilisateurS;