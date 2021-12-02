const Position = require("../models/Position");
const Vendor = require("../models/vendor");

const sequelize = require("../sequelize");
const { Sequelize } = require("sequelize");
const Reward = require("../models/Reward");
const PersonalReward = require("../models/PersonalReward");

module.exports.findAll = async (req, res) => {
  try {
    const vendor = await Vendor.findAll();
    if (rewards.length != 0) {
      res.json(vendor);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports.findOne = async (req, res) => {
  const { id } = req.body;

  try {
    if (isNaN(id)) {
      res.sendStatus(400);
    } else {
      const vendor = await Vendor.findOne({ where: { id: id } });
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
  const { name_fr, name_en, description_fr, description_en } = req.body;
  let { position } = req.body;
  try {
    await sequelize.transaction(
      {
        deferrable: Sequelize.Deferrable.SET_DEFERRED,
      },
      async (t) => {
        const positionDB = await Position.findOne({
          where: { id: position.id },
        });
        if (positionDB === null) {
          position = await Position.create(
            {
              coordinate_x: position.coordinate_x,
              coordinate_y: position.coordinate_y,
            },
            { transaction: t }
          );
        } else {
          position = positionDB;
        }

        await Vendor.create(
          {
            name_fr,
            name_en,
            description_fr,
            description_en,
            position_id: position.id,
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
};


module.exports.destroy = async (req, res) => {
  const { id } = req.body;
  try {
    await sequelize.transaction(
      {
        deferrable: Sequelize.Deferrable.SET_DEFERRED,
      },
      async (t) => {

        //await PersonalReward.destroy({ where: { reward_id:  } });
        await Reward.destroy({ where: { vendor_id: id } });
        await Vendor.destroy({ where: { id } });
        res.sendStatus(204);
      }
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
