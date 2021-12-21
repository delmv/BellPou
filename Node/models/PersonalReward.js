const { DataTypes, Deferrable } = require("sequelize");
const sequelize = require("../sequelize/sequelize");

const Client = require("./Client");
const Reward = require("./Reward");

/**
 * @swagger
 * components:
 *  schemas:
 *      PersonalReward:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              discount_code:
 *                  type: string
 *              exp_date:
 *                  type: string
 *                  format: date
 *              is_used:
 *                  type: boolean
 *              client_id:
 *                  type: integer
 *              reward_id:
 *                  type: integer
 *          required:
 *              - discount_code
 *              - exp_date
 *              - is_used
 *              - client_id
 *              - reward_id
 */

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
