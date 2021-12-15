const Position = require("../models/Position");
const Trash = require("../models/Trash");
const Client = require("../models/Client");
const Report = require("../models/Report")

const sequelize = require("../sequelize");
const { Sequelize } = require("sequelize");
const { raw } = require("body-parser");
const { randomString } = require("../utils/utils");

module.exports.findAll = async (req, res) => {
  try {
    const trashs = await Trash.findAll({
      include: [Position]
    });

    if (trashs.length != 0) {

      res.json(trashs);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports.findOne = async (req, res) => {
  const idTexte = req.params.id; //attention ! Il s'agit de texte !
  const id = parseInt(idTexte);
  try {
    if (isNaN(id)) {
      res.sendStatus(400);
    } else {
      const trash = await Trash.findByPk(id, {
        include: [Position]
      });
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

        const positionDB = await Position.findByPk(position.id);

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
        const qrValue = randomString();
        await Trash.create(
          {
            qr_value: qrValue,
            position_id: position.id

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

module.exports.addAdvertisement = async (req, res) => {
  const { qr_code: qrCode, email } = req.body;

  try {
    await sequelize.transaction( {
      deferrable: Sequelize.Deferrable.SET_DEFERRED
    }, async (t) => {
      const trash = await Trash.findOne({where: {qr_code: qrCode}});
      const clientId = req.session.id;

      if (trash === null)
        throw new Error("Trash not found in database");

      await Report.create({
        trash: trash.id,
        client: clientId
      }, {transaction: t});
    });

    res.sendStatus(201);
  } catch (e) {
    if (e.message === "Trash not found in database")
      res.status(404).json({error: "The QR code passed doesn't exists."});
    else {
      console.error(e);
      res.sendStatus(500);
    }
  }
}
