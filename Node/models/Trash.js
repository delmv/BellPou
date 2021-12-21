const { DataTypes, Sequelize, Deferrable } = require("sequelize");
const sequelize = require("../sequelize/sequelize");
const Position = require("./Position");
/**
 * @swagger
 * components:
 *  schemas:
 *      Trash:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              is_full:
 *                  type: boolean
 *              nb_alerts:
 *                  type: integer
 *              last_empty:
 *                  type: string
 *                  format: date
 *              qr_code:
 *                  type: string
 *              position_id:
 *                  type: integer
 *                  $ref: "#/components/schemas/Position"
 *          required:
 *              - is_full
 *              - nb_alerts
 *              - last_empty
 *              - qr_code
 *              - position_id
 */

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
    qr_code: {
      type: DataTypes.STRING,
      allowNull: false,
    }
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

