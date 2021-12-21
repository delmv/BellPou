const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize/sequelize");

/**
 * @swagger
 * components:
 *  schemas:
 *      Position:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              coordinate_x:
 *                  type: integer
 *                  format: float
 *              coordinate_y:
 *                  type: string
 *                  format: float
 *          required:
 *              - coordinate_x
 *              - coordinate_y
 */

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
