const { DataTypes, Sequelize, Deferrable } = require("sequelize");
const sequelize = require("../sequelize/sequelize");
const Vendor = require("./Vendor");

/**
 * @swagger
 * components:
 *  schemas:
 *      Reward:
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
 *              vendor_id:
 *                  type: integer
 *          required:
 *              - name_fr
 *              - name_en
 *              - description_fr
 *              - description_en
 *              - throins_cost
 *              - real_cost
 *              - vendor_id
 */

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
