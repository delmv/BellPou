const Manager = require("../models/Manager");

module.exports.getManager = async (req, res) => {
  const idTexte = req.params.id; //attention ! Il s'agit de texte !
  const id = parseInt(idTexte);
  try {
    const client = await Manager.findByPk(id);
    if (client !== null) {
      res.json(client);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
