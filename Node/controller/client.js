const Client = require('../model/Client')

module.exports.getClient = async (req, res) => {
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const client = await Client.findOne({where: {id: id}});
            if(client !== null){
                res.json(client);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports.postClient = async(req,res) =>{
    const body = req.body;
    const {first_name,last_name,birth_date,email,mdp} = body;
    try{
        await Client.create({
            first_name,
            last_name,
            birth_date,
            email,
            mdp
        });
        res.sendStatus(201);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports.deleteClient = (req, res) => {
    const {id} = req.body;
    const reponse = Client.destroy({where:{id}});
    if(reponse){
        res.sendStatus(204);
    } else {
        res.sendStatus(500);
    }
}