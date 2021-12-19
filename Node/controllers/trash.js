const Position = require("../models/Position");
const Trash = require("../models/Trash");
const Client = require("../models/Client");
const Report = require("../models/Report")

const PositionController = require("../controllers/position");

const sequelize = require("../sequelize/sequelize");
const { Sequelize } = require("sequelize");
const { raw } = require("body-parser");
const { randomString } = require("../utils/utils");

module.exports.findAll = async (req, res) => {
  try {
    const trashs = await Trash.findAll({
      include: [Position]
    });

    res.json(trashs);

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
  const { position } = req.body;
  let trash = null;
  try {
    await sequelize.transaction(
      {
        deferrable: Sequelize.Deferrable.SET_DEFERRED,
      },
      async (t) => {

        const positionsDB = await PositionController.findOrCreate(position, { transaction: t });
        const qrValue = randomString();

        trash = await Trash.create(
          {
            qr_value: qrValue,
            position_id: positionsDB[0].id

          },
          { transaction: t }
        );
      }
    );
    res.json(trash);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports.update = async (req, res) => {
  if (req.session === undefined) {
    return res.sendStatus(401);
  }

  const newData = {};
  const toUpdate = req.body;
  try {
    const trash = await Trash.findByPk(toUpdate.id);
    if (trash == null) {
      req.sendStatus(404);
    } else {
      newData.is_full = toUpdate.is_full
        ? toUpdate.is_full
        : trash.is_full;

      newData.nb_alerts = toUpdate.nb_alerts
        ? toUpdate.nb_alerts
        : trash.nb_alerts;

      newData.last_empty = toUpdate.last_empty
        ? toUpdate.last_empty
        : trash.last_empty;

      newData.qr_value = toUpdate.qr_value
        ? toUpdate.qr_value
        : trash.qr_value;

      newData.position_id = toUpdate.position_id
        ? toUpdate.position_id
        : trash.position_id;

      await trash.update({
        is_full: newData.is_full,
        nb_alerts: newData.nb_alerts,
        last_empty: newData.last_empty,
        qr_value: newData.qr_value,
        position_id: newData.position_id,
      });
      res.sendStatus(204);
    }
  } catch (e) {
    console.error(e);
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
    
      const trash = await Trash.findOne({where: {qr_code: qrCode}});
      const clientId = req.session.id;

      if (trash === null)
        throw new Error("Trash not found in database");

      await Report.create({
        trash: trash.id,
        client: clientId
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
