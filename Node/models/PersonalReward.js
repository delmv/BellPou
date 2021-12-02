const { DataTypes, Sequelize, Deferrable } = require("sequelize");
const sequelize = require("../sequelize");

const Client = require("./Client");
const Reward = require("./Reward");

const PersonalReward = sequelize.define(
  "personal_reward",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
      primaryKey: true,
    },
    discount_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exp_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: false,
      references: {
        model: Client,
        key: "id",
      },
    },
    reward_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: false,
      references: {
        model: Reward,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = PersonalReward;
