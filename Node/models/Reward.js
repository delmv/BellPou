const { DataTypes, Sequelize, Deferrable } = require("sequelize");
const sequelize = require("../sequelize");
const Vendor = require("./Vendor");

const Reward = sequelize.define(
  "reward",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
      primaryKey: true,
    },
    name_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    throins_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    real_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Vendor,
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

module.exports = Reward;
