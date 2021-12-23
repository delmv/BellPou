const Reward = require("../models/Reward");
const Vendor = require("../models/Vendor");

const PositionController = require("./position");
const VendorController = require("./vendor")

const sequelize = require("../sequelize/sequelize");
const { Sequelize } = require("sequelize");


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


module.exports.create = async (req, res) => {
  const {
    name_fr,
    name_en,
    description_fr,
    description_en,
    throins_cost,
    real_cost
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
              name_fr,
              name_en,
              description_fr,
              description_en,
              position_id: positionsDB[0].id,
            }, { transaction: t }
          );

        }

        await Reward.create(
          {
            name_fr,
            name_en,
            description_fr,
            description_en,
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
};

/**
 *@swagger
 *components:
 *  responses:
 *      RewardDeleted:
 *          description: The Reward has been deleted
 *  requestBodies:
 *      RewardToDelete:
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
  const { id } = req.body;
  try {
    await Reward.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
