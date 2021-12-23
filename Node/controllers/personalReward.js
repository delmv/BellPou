const Client = require("../models/Client");
const PersonalReward = require("../models/PersonalReward");
const Reward = require("../models/Reward");
const { randomString } = require("../utils/utils");
const sequelize = require("../sequelize/sequelize");
const { Sequelize } = require("sequelize");
const { validationResult } = require("express-validator");

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


/**
 * @swagger
 * components:
 *  responses:
 *      PersonalRewardsFound:
 *           description: return all the personal reward of the user session
 *           content:
 *               application/json:
 *                   schema:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/PersonalReward'
 */

 module.exports.findAll = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const clientId = req.session.id;

  try {
    const personalsRewards = await PersonalReward.findAndCountAll({
      where: {client_id: clientId},
      limit,
      offset
    });
    const reponse = getPagingData(personalsRewards,page,limit);
    res.json(reponse);
  } catch (error) {
    res.sendStatus(500);
  }
};



/**
 *@swagger
 *components:
 *  responses:
 *      PersonalRewardAdded:
 *          description: The personalReward has been added
 *  requestBodies:
 *      PersonalRewardToAdd:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          reward_id:
 *                              type: integer
 *          required:
 *              - reward_id
 */


module.exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.status(400).json({errors: errors.array() })
  else {
  
    if (req.session === undefined) {
      return res.sendStatus(401);
    }
  
    const clientId = req.session.id;
    const { reward_id } = req.body;
  
    try {
      const client = await Client.findByPk(clientId);
      const reward = await Reward.findByPk(reward_id);
  
      if (client === null)
        throw new Error("Client not found");
  
      if (reward === null)
        throw new Error("Reward not found");
  
      if (client.nb_throins < reward.throins_cost)
        throw new Error("Too poor :'(");
  
      await sequelize.transaction(
        {
          deferrable: Sequelize.Deferrable.SET_DEFERRED,
        },
        async (t) => {
          await client.update({
            nb_throins: client.nb_throins - reward.throins_cost
          }, { transaction: t });
  
          const discount_code = randomString();
          let date = new Date();
          date.setMonth(date.getMonth() + 2);
          const exp_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  
          const personalReward = await PersonalReward.create({
            discount_code,
            exp_date,
            client_id: client.id,
            reward_id: reward.id
          },
            { transaction: t }
          );
          res.json(personalReward);
        });
    } catch (error) {
      if (error.message === "Client not found" || error.message === "Reward not found" || error.message === "Too poor :'(")
        res.status(404).json({ error: error.message });
  
      console.error(error);
      res.sendStatus(500);
    }
  }
};
/**
 *@swagger
 *components:
 *  responses:
 *      PersonalRewardDeleted:
 *          description: The personalReward has been deleted
 *  requestBodies:
 *      PersonalRewardToDelete:
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
      await PersonalReward.destroy({ where: { id } });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }

  }
};
