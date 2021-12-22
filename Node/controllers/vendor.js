const Vendor = require("../models/vendor");
const Position = require("../models/Position");

const PositionController = require("../controllers/position");

const sequelize = require("../sequelize/sequelize");
const { Sequelize } = require("sequelize");
const Reward = require("../models/Reward");

module.exports.findAll = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  
  try {
    const vendors = await Vendor.findAndCountAll({
      include: [Position],
      limit,
      offset
    });
    const reponse = getPagingData(vendors,page,limit);
    res.json(reponse);
  } catch (error) {
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
      const vendor = await Vendor.findByPk(id, {
        include: [Position]
      });
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

        const positionsDB = await PositionController.findOrCreate(position, t);

        await Vendor.create(
          {
            name_fr,
            name_en,
            description_fr,
            description_en,
            position_id: positionsDB[0].id,
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
        await Reward.destroy({ where: { vendor_id: id } }, { transaction: t });
        await Vendor.destroy({ where: { id } }, { transaction: t });
        res.sendStatus(204);
      }
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
