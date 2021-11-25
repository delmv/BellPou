const {DataTypes, Sequelize, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');
const Position = require('./Position');

const Trash = sequelize.define('trash', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
    },
    is_full: {
        type: DataTypes.BOOLEAN
    },
    nb_alerts: {
        type: DataTypes.INTEGER
    },
    last_empty: {
        type: DataTypes.DATE
    },
    position_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Position,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Trash;