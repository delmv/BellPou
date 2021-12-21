const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize/sequelize");

/**
 * @swagger
 * components:
 *  schemas:
 *      Client:
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
 *              nb_bad_report:
 *                  type: integer
 *                  minimum: 0
 *              is_banned:
 *                  type: boolean
 *          required:
 *              - first_name
 *              - last_name
 *              - birth_date
 *              - nb_throins
 *              - email
 *              - password
 *              - nb_bad_report
 *              - is_banned
 */

const Client = sequelize.define(
  "client",
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
    nb_throins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    nb_bad_reports: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_banned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Client;
