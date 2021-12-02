const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Position = sequelize.define(
  "position",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
      primaryKey: true,
    },
    coordinate_x: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    coordinate_y: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    } /* ,
    location: {
        type: DataTypes.GEOMETRY('POINT')
    }, */,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Position;
