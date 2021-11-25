const Position = require("../model/Position");

module.exports.getPosition = async (req, res) => {
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const position = await Position.findOne({where: {id: id}});
            if(position !== null){
                res.json(position);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
    
}

module.exports.postPosition = async(req,res) =>{
    const body = req.body;
    const {coordinate_x,coordinate_y} = body;
    try{
        await Position.create({coordinate_x,coordinate_y});
        res.sendStatus(201);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports.deletePosition = (req, res) => {
    const {id} = req.body;
    const reponse = Position.destroy({where:{id}});
    if(reponse){
        res.sendStatus(204);
    } else {
        res.sendStatus(500);
    }
}


