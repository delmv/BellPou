const Vendor = require("../models/vendor");
const Position = require("../models/Position");

const PositionController = require("../controllers/position");

const sequelize = require("../sequelize/sequelize");
const { Sequelize } = require("sequelize");
const Reward = require("../models/Reward");
const {validationResult} = require("express-validator");

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


module.exports.findAll = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  
  try {
    const vendors = await Vendor.findAndCountAll({
      include: [Position],
      limit,
      offset
    });
    const reponse = getPagingData(vendors,page,limit);
    res.json(reponse);
  } catch (error) {
    res.sendStatus(500);
  }
};

/**
 * @swagger
 * components:
 *  responses:
 *      VendorFound:
 *           description: return a Vendor
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Vendor'
 */
module.exports.findOne = async (req, res) => {
  const idTexte = req.params.id; //attention ! Il s'agit de texte !
  const id = parseInt(idTexte);
  try {
    if (isNaN(id)) {
      res.sendStatus(400);
    } else {
      const vendor = await Vendor.findByPk(id, {
        include: [Position]
      });
      if (vendor !== null) {
        res.json(vendor);
      } else {
        res.sendStatus(404);
      }
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};


module.exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.status(400).json({errors: errors.array() })
  else {
    const { name_fr, name_en, description_fr, description_en } = req.body;
    let { position } = req.body;
    try {
      await sequelize.transaction(
          {
            deferrable: Sequelize.Deferrable.SET_DEFERRED,
          },
          async (t) => {

            const positionsDB = await PositionController.findOrCreate(position, t);

            await Vendor.create(
                {
                  name_fr,
                  name_en,
                  description_fr,
                  description_en,
                  position_id: positionsDB[0].id,
                },
                { transaction: t }
            );
          }
      );
      res.sendStatus(201);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
};

/**
 *@swagger
 *components:
 *  responses:
 *      VendorDeleted:
 *          description: The Vendor has been deleted
 *  requestBodies:
 *      VendorToDelete:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *          required:
 *              - id
 */
module.exports.destroy = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.status(400).json({errors: errors.array() })
  else {
    const { id } = req.body;
    try {
      await sequelize.transaction(
          {
            deferrable: Sequelize.Deferrable.SET_DEFERRED,
          },
          async (t) => {
            await Reward.destroy({ where: { vendor_id: id } }, { transaction: t });
            await Vendor.destroy({ where: { id } }, { transaction: t });
            res.sendStatus(204);
          }
      );
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
};
