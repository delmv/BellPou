const { DataTypes, Sequelize, Deferrable } = require("sequelize");
const sequelize = require("../sequelize/sequelize");
const Trash = require('./Trash')
const Client = require('./Client')

const Report = sequelize.define(
    "report",
    {
        trash: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Trash,
                key: "id",
                deferrable: Deferrable.INITIALLY_IMMEDIATE()
            }
        },
        client: {
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