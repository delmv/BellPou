const { DataTypes, Sequelize, Deferrable } = require("sequelize");
const sequelize = require("../sequelize/sequelize");
const Position = require("./Position");





const Vendor = sequelize.define(
  "vendor",
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
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
Vendor.belongsTo(Position, {
  foreignKey: {
    name: 'position_id',
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'CASCCADE'
});


module.exports = Vendor;
