const Position = require("../models/Position");

module.exports.findOne = async (req, res) => {
  const idTexte = req.params.id; //attention ! Il s'agit de texte !
  const id = parseInt(idTexte);
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

module.exports.findOrCreate = async (position) => {
  return await Position.findOrCreate({
    where: { id: position.id ?? null },
    defaults: {
      coordinate_x: position.coordinate_x,
      coordinate_y: position.coordinate_y
    }
  });
}

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
    res.json(positions);
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
