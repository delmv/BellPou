const PersonalReward = require('../model/PersonalReward')

module.exports.getPersonalReward = async (req, res) => {
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const personalReward = await PersonalReward.findOne({where: {id: id}});
            if(personalReward !== null){
                res.json(personalReward);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports.postPersonalReward = async(req,res) =>{
    const {discount_code,exp_date,client_id,location_id} = req.body;
    try{
        await PersonalReward.create({
            discount_code,
            exp_date,
            client_id,
            location_id
        });
        res.sendStatus(201);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports.deletePersonalReward = (req, res) => {
    const {id} = req.body;
    const reponse = PersonalReward.destroy({where:{id}});
    if(reponse){
        res.sendStatus(204);
    } else {
        res.sendStatus(500);
    }
}