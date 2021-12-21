const { DataTypes, Sequelize, Deferrable } = require("sequelize");
const sequelize = require("../sequelize/sequelize");
const Trash = require('./Trash')
const Client = require('./Client')

/**
 * @swagger
 * components:
 *  schemas:
 *      Report:
 *          type: object
 *          properties:
*              trash_id:
 *                  type: integer
 *              client_id:
 *                  type: integer
 *          required:
 *              - client_id
 *              - trash_id
 */

const Report = sequelize.define(
    "report",
    {
        trash_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Trash,
                key: "id",
                deferrable: Deferrable.INITIALLY_IMMEDIATE()
            }
        },
        client_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Client,
                key: "id",
                deferrable: Deferrable.INITIALLY_IMMEDIATE()
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)

module.exports = Report