const {DataTypes, Sequelize, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');
const Vendor = require('./Vendor');

const Reward = sequelize.define('reward', {
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
    throins_cost: {
        type: DataTypes.INTEGER
    },
    real_cost: {
        type: DataTypes.FLOAT
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Vendor,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Reward;