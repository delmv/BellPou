const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize/sequelize");
/**
 * @swagger
 * components:
 *  schemas:
 *      Manager:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              first_name:
 *                  type: string
 *              last_name:
 *                  type: string
 *              birth_date:
 *                  type: string
 *                  format: date
 *              nb_throins:
 *                  type: integer
 *              email:
 *                  type: string
 *                  format: email
 *              password:
 *                  type: string
 *                  format: password
 *          required:
 *              - first_name
 *              - last_name
 *              - birth_date
 *              - nb_throins
 *              - email
 *              - password
 */

const Manager = sequelize.define(
  "manager",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Manager;
