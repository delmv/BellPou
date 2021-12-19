const Reward = require("../models/Reward");
const Vendor = require("../models/Vendor");

const PositionController = require("./position");
const VendorController = require("./vendor")

const sequelize = require("../sequelize");
const { Sequelize } = require("sequelize");


module.exports.findOne = async (req, res) => {
  const idTexte = req.params.id; //attention ! Il s'agit de texte !
  const id = parseInt(idTexte);
  try {
    if (isNaN(id)) {
      res.sendStatus(400);
    } else {
      const reward = await Reward.findByPk(id);
      if (reward !== null) {
        res.json(reward);
      } else {
        res.sendStatus(404);
      }
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports.findAll = async (req, res) => {
  try {
    const rewards = await Reward.findAll();
    res.json(rewards);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports.create = async (req, res) => {
  const {
    name_fr,
    name_en,
    description_fr,
    description_en,
    throins_cost,
    real_cost
  } = req.body;
  let { vendor } = req.body;
  try {
    await sequelize.transaction(
      {
        deferrable: Sequelize.Deferrable.SET_DEFERRED,
      },
      async (t) => {
        let vendorDB = await Vendor.findByPk(vendor.id);
        if (vendorDB === null) {
          const positionsDB = await PositionController.findOrCreate(vendor.position, { transaction: t });
          vendorDB = await Vendor.create(
            {
              name_fr,
              name_en,
              description_fr,
              description_en,
              position_id: positionsDB[0].id,
            }, { transaction: t }
          );

        }

        await Reward.create(
          {
            name_fr,
            name_en,
            description_fr,
            description_en,
            throins_cost,
            real_cost,
            vendor_id: vendorsDB.id,
          },
          { transaction: t }
        );
      }
    );
    res.sendStatus(201);
  } catch (e) {
    if (e.message === "Localisation non valide") {
      res.status(404).json({ error: "La localisation n'est pas valide" });
    } else {
      console.log(e);
      res.sendStatus(500);
    }
  }
};

module.exports.destroy = async (req, res) => {
  const { id } = req.body;
  try {
    await Reward.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
