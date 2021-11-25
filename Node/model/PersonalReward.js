const {DataTypes, Sequelize, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');

const Client = require('./Client');
const Reward = require('./Reward');

const PersonalReward = sequelize.define('personal_reward', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
    },
    discount_code: {
        type: DataTypes.STRING
    },
    exp_date: {
        type: DataTypes.DATE
    },
    is_used: {
        type: DataTypes.BOOLEAN
    },
    client_id: {
        type: DataTypes.INTEGER,
        references:{
            model: Client,
            key : 'id'
        }
    },
    reward_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Reward,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = PersonalReward;