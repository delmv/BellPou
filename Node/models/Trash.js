const { DataTypes, Sequelize, Deferrable } = require("sequelize");
const sequelize = require("../sequelize");
const Position = require("./Position");

const Trash = sequelize.define(
  "trash",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
      primaryKey: true,
    },
    is_full: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    nb_alerts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    last_empty: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
Trash.belongsTo(Position, {
  foreignKey: {
    name: 'position_id',
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'CASCCADE'
});
module.exports = Trash;

