const {DataTypes, Sequelize, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');
const Position = require('./Position');

const Vendor = sequelize.define('vendor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
    },
    name_fr: {
        type: DataTypes.STRING
    },
    name_en: {
        type: DataTypes.STRING
    },
    description_fr: {
        type: DataTypes.STRING
    },
    description_en: {
        type: DataTypes.STRING
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

module.exports = Vendor;