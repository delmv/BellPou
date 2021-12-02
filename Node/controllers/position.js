const Position = require("../models/Position");

module.exports.findOne = async (req, res) => {
  const { id } = req.body;
  try {
    if (isNaN(id)) {
      res.sendStatus(400);
    } else {
      const position = await Position.findOne({ where: { id: id } });
      if (position !== null) {
        res.json(position);
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
  const body = req.body;
  const { coordinate_x, coordinate_y } = body;
  try {
    await Position.create({ coordinate_x, coordinate_y });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
module.exports.findAll = async (req, res) => {
  try {
    const positions = await Position.findAll();
    if (rewards.length != 0) {
      res.json(positions);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports.destroy = async (req, res) => {
  const { id } = req.body;
  try {
    await Position.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
