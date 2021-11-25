const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const Client = sequelize.define('client', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    birth_date: {
        type: DataTypes.DATE
    },
    nb_throins: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING
    },
    mdp: {
        type: DataTypes.STRING
    },
    nb_throins: {
        type: DataTypes.INTEGER
    },
    nb_bad_reports: {
        type: DataTypes.INTEGER
    },
    is_banned:{
        type: DataTypes.BOOLEAN
    },
    is_admin:{
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Client;