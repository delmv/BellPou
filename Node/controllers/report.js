const Trash = require("../models/Trash");
const Report = require("../models/Report")

const sequelize = require("../sequelize/sequelize");
const { Sequelize } = require("sequelize");


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

/**
 *@swagger
 *components:
 *  responses:
 *      ReportAdded:
 *          description: The report has been added
 *  requestBodies:
 *      ReportToAdd:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          qr_code:
 *                              type: string
 *          required:
 *              - qr_code
 */

module.exports.create = async (req, res) => {
    const { qr_code } = req.body;
  
    try {
  
      const trash = await Trash.findOne({where: {qr_code: qr_code}});
      const clientId = req.session.id;
  
  
      await sequelize.transaction(
        {deferrable: Sequelize.Deferrable.SET_DEFERRED},
        async (t) => {
          if (trash === null)
          throw new Error("Trash not found in database");
  
          await Report.create({
          trash: trash.id,
          client: clientId
          }, {transaction: t});
  
          trash.nb_alerts++;
          trash.is_full = trash.nb_alerts >= 3;
  
          await trash.update({
          is_full: trash.is_full,
          nb_alerts: trash.nb_alerts
          }, {transaction: t});
  
          res.sendStatus(201);
        }
      )
        
    } catch (e) {
      if (e.message === "Trash not found in database")
        res.status(404).json({ error: "The QR code passed doesn't exists." });
      else {
        console.error(e);
        res.sendStatus(500);
      }
    }
  }