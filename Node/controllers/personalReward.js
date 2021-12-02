const { where } = require("sequelize/dist");
const Client = require("../models/Client");
const PersonalReward = require("../models/PersonalReward");
const Position = require("../models/Position");
const Reward = require("../models/Reward");

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
      if (personal_rewards !== null) {
        res.json(personal_rewards);
      } else {
        res.sendStatus(204);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(404);
  }
};

module.exports.findOne = async (req, res) => {
  const { id } = req.body;
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
  const { discount_code, exp_date, reward_id } = req.body;

  try {
    const client = await Client.findByPk(clientId);
    const reward = await Reward.findByPk(reward_id);
    if (client != null && reward != null) {
      await PersonalReward.create({
        discount_code,
        exp_date,
        client_id: client.id,
        reward_id: reward.id
      });
    } else {
      res.sendStatus(400);
    }

    res.sendStatus(201);
  } catch (error) {
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
