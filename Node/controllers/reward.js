const Reward = require("../models/Reward");
const Vendor = require("../models/Vendor");

const PositionController = require("./position");
const VendorController = require("./vendor")

const sequelize = require("../sequelize/sequelize");
const { Sequelize } = require("sequelize");

const { validationResult } = require("express-validator");

/**
 * @swagger
 * components:
 *  responses:
 *      RewardFound:
 *           description: return a reward
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/models/schemas/Reward'
 */

/**
 * @swagger
 * components:
 *  responses:
 *      RewardFound:
 *           description: return a Reward
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Reward'
 */
module.exports.findOne = async (req, res) => {
  const idTexte = req.params.id;
  const id = parseInt(idTexte);
  try {
    if (isNaN(id)) {
      res.sendStatus(400);
    } else {
      const reward = await Reward.findByPk(id);
      if (reward !== null) {
        res.json(reward);
      } else {
        res.sendStatus(404);
      }
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

/**
 * @swagger
 * components:
 *  responses:
 *      RewardsFound:
 *           description: return un array of Rewards
 *           content:
 *               application/json:
 *                   schema:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/Reward'
 */
module.exports.findAll = async (req, res) => {
  try {
    const rewards = await Reward.findAll();
    res.json(rewards);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports.findAllPaging = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const rewards = await Reward.findAndCountAll({
      limit,
      offset
    });
    const reponse = getPagingData(rewards,page,limit);
    res.json(reponse);
  } catch (error) {
    res.sendStatus(500);
  }
};

/**
 *@swagger
 *components:
 *  responses:
 *      RewardAdded:
 *          description: The Reward has been added
 *  requestBodies:
 *      RewardToAdd:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name_fr:
 *                              type: string
 *                          name_en:
 *                              type: string
 *                          description_fr:
 *                              type: string
 *                          description_en:
 *                              type: string
 *                          throins_cost:
 *                              type: integer
 *                          real_cost:
 *                              type: number
 *                              format: float
 *                          vendor:
 *                               type: object
 *                               $ref: "#/components/schemas/Vendor" 
 *                                  
 */
module.exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.status(400).json({errors: errors.array() })
  else {
    const {
      reward_name_fr,
      reward_name_en,
      reward_description_fr,
      reward_description_en,
      throins_cost,
      real_cost,
      vendor_name_fr,
      vendor_name_en,
      vendor_description_fr,
      vendor_description_en,
    } = req.body;
    let { vendor } = req.body;
    try {
      await sequelize.transaction(
        {
          deferrable: Sequelize.Deferrable.SET_DEFERRED,
        },
        async (t) => {
          let vendorDB = await Vendor.findByPk(vendor.id);
          if (vendorDB === null) {
            const positionsDB = await PositionController.findOrCreate(vendor.position, t);
            vendorDB = await Vendor.create(
              {
                name_fr: vendor_name_fr,
                name_en: vendor_name_en,
                description_fr: vendor_description_fr,
                description_en: vendor_description_en,
                position_id: positionsDB[0].id,
              }, { transaction: t }
            );
  
          }
  
          await Reward.create(
            {
              name_fr: reward_name_fr,
              name_en: reward_name_en,
              description_fr: reward_description_fr,
              description_en: reward_description_en,
              throins_cost,
              real_cost,
              vendor_id: vendorsDB.id,
            },
            { transaction: t }
          );
        }
      );
      res.sendStatus(201);
    } catch (e) {
      if (e.message === "Localisation not valid") {
        res.status(404).json({ error: e.message});
      } else {
        console.log(e);
        res.sendStatus(500);
      }
    } 
  
  }
};

module.exports.destroy = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.status(400).json({errors: errors.array() })
  else {
    const { id } = req.body;
    try {
      await Reward.destroy({ where: { id } });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
};
