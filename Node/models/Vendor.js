const { DataTypes, Sequelize, Deferrable } = require("sequelize");
const sequelize = require("../sequelize/sequelize");
const Position = require("./Position");



/**
 * @swagger
 * components:
 *  schemas:
 *      Vendor:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              name_fr:
 *                  type: string
 *              name_en:
 *                  type: string
 *              description_fr:
 *                  type: string
 *              description_en:
 *                  type: string
 *              throins_cost:
 *                  type: integer
 *              real_cost:
 *                  type: number
 *                  format: float
 *              position_id:
 *                  type: integer
 *                  $ref: "#/components/schemas/Position"
 *          required:
 *              - name_fr
 *              - name_en
 *              - description_fr
 *              - description_en
 *              - position_id
 */

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
