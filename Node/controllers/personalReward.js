const { where } = require("sequelize/dist");
const Client = require("../models/Client");
const PersonalReward = require("../models/PersonalReward");
const Position = require("../models/Position");
const Reward = require("../models/Reward");
const { randomString } = require("../utils/utils");
const sequelize = require("../sequelize/sequelize");
const { Sequelize } = require("sequelize");

module.exports.findAll = async (req, res) => {
  if (req.session === undefined) {
    return res.sendStatus(401);
  }
  const clientId = req.session.id;
  if (clientId != null) {
    try {
      const clientId = req.session.id;
      const personal_rewards = await PersonalReward.findAll({
        where: { client_id: clientId },
      });
      res.json(personal_rewards);

    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(404);
  }
};

module.exports.findOne = async (req, res) => {
  const idTexte = req.params.id; //attention ! Il s'agit de texte !
  const id = parseInt(idTexte);
  try {
    if (isNaN(id)) {
      res.sendStatus(400);
    } else {
      const personalReward = await PersonalReward.findByPk(id);
      if (personalReward !== null) {
        res.json(personalReward);
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
      throw new Error("Too poor :'( ");

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
    if (error.message === "Client not found" || error.message === "Reward not found")
      res.status(404).json({ error: error.message });

    console.error(error);
    res.sendStatus(500);
  }
};

module.exports.destroy = async (req, res) => {
  const { id } = req.body;
  try {
    await PersonalReward.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
