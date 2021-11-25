const Position = require("../model/Position");
const Vendor = require("../model/vendor");

const sequelize = require("../sequelize");
const {Sequelize} = require("sequelize");

module.exports.getVendor = async (req, res) => {
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const vendor = await Vendor.findOne({where: {id: id}});
            if(vendor !== null){
                res.json(vendor);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
    
}

module.exports.postVendor = async(req,res) =>{
    const {name_fr,name_en,description_fr,description_en} = req.body;
    let {position} = req.body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {

            const positionDB = await Position.findOne({where: {id: position.id}});
            if(positionDB === null){
                position = await Position.create({
                    coordinate_x: position.coordinate_x,
                    coordinate_y: position.coordinate_y
                }, {transaction: t});
            } else {
                position = positionDB;
            }
            
            await Vendor.create({
                name_fr,
                name_en,
                description_fr,
                description_en,
                position_id : position.id
            }, {transaction: t});

        });
        res.sendStatus(201);
    } catch (e){
            console.log(e);
        res.sendStatus(500);
    }
}

module.exports.deleteVendor = (req, res) => {
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    const reponse = Vendor.destroy({where:{id}});
    if(reponse){
        res.sendStatus(204);
    } else {
        res.sendStatus(500);
    }
}


