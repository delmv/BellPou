const Vendor = require('../model/Vendor');
const Reward = require('../model/Reward');

const sequelize = require("../sequelize");
const {Sequelize} = require("sequelize");

module.exports.getReward = async (req, res) => {
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const reward = await Reward.findOne({where: {id: id}});
            if(reward !== null){
                res.json(reward);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error){
        res.sendStatus(500);
    }
}

module.exports.postReward = async (req, res) => {
    const {name_fr,name_en,description_fr,description_en,throins_cost,real_cost} = req.body;
    let {vendor} = req.body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {

            const vendorDB = await Vendor.findOne({where: {id: vendor.id}});
            if(vendorDB === null){
                const positionDB = await Position.findOne({where: {id: position.id}});
                if(positionDB === null){
                    position = await Position.create({
                        coordinate_x: position.coordinate_x,
                        coordinate_y: position.coordinate_y
                    }, {transaction: t});
                } else {
                    position = positionDB;
                }

                vendor = await Vendor.create({
                    name_fr: vendor.name_fr,
                    name_en: vendor.name_en,
                    description_fr: vendor.description_fr,
                    description_en: vendor.description_en,
                    location_id: position.id
                }, {transaction: t});
            } else {
                vendor = vendorDB;
            }
            
            await Reward.create({
                name_fr,
                name_en,
                description_fr,
                description_en,
                throins_cost,
                real_cost,
                vendor_id : vendor.id
            }, {transaction: t});

        });
        res.sendStatus(201);
    } catch (e){
        if(e.message === "Localisation non valide"){
            res.status(404).json({error: "La localisation n'est pas valide"});
        } else {
            console.log(e);
            res.sendStatus(500);
        }
    }
}



module.exports.deleteReward = async (req, res) => {
    const {id} = req.body;
    try{
        await Reward.destroy({where: {id}});
        res.sendStatus(204);
    } catch (error){
        res.sendStatus(500);
    }
}