const Position = require("../models/Position");
const Trash = require("../models/Trash");

const sequelize = require("../sequelize");
const { Sequelize } = require("sequelize");

module.exports.findAll = async (req, res) => {
  try {
    const trash = await Trash.findAll();
    if (rewards.length != 0) {
      res.json(trash);
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
      const trash = await Trash.findByPk(id);
      if (trash !== null) {
        res.json(trash);
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

        await Trash.create(
          {
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
    await Trash.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
