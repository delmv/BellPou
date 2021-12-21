const Client = require("../models/Client");
const PersonalReward = require("../models/PersonalReward");
const { getHash } = require("../utils/utils");
const jwt = require("jsonwebtoken");

const sequelize = require("../sequelize/sequelize");
const { Sequelize } = require("sequelize");



/**
 * @swagger
 * components:
 *  responses:
 *      ClientsFound:
 *           description: return un array of Clients
 *           content:
 *               application/json:
 *                   schema:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/Client'
 */
module.exports.findAll = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

/**
 *@swagger
 *components:
 *  responses:
 *      ClientAdded:
 *          description: The client has been added
 *  requestBodies:
 *      ClientToAdd:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          birth_date:
 *                              type: string
 *                              format: date
 *                          nb_throins:
 *                              type: integer
 *                          email:
 *                              type: string
 *                              format: email
 *                          password:
 *                              type: string
 *                              format: password
 */


module.exports.create = async (req, res) => {
  const { first_name, last_name, birth_date, email, password } = req.body;
  if (
    first_name != undefined &&
    last_name != undefined &&
    birth_date != undefined &&
    email != undefined &&
    password != undefined
  ) {
    try {
      const hashedPassword = await getHash(password);
      const client = await Client.create({
        first_name,
        last_name,
        birth_date,
        email,
        password: hashedPassword,
      });
      const value = {
        id: client.id,
        last_name: client.last_name,
        first_name: client.first_name
      }
      const payload = {
        status: "user",
        value
      };
      const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: "1d",
      });

      client.token = token;
      res.json(token);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.status(400).json({
      error: "first_name,last_name,birth_date,email,password are required",
    });
  }
};

/**
 *@swagger
 *components:
 *  responses:
 *      ClientUpdated:
 *          description: The Client has been updtated
 *  requestBodies:
 *      ClientToUpdate:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Client'
 */

module.exports.update = async (req, res) => {
  if (req.session === undefined) {
    return res.sendStatus(401);
  }

  const newData = {};
  const toUpdate = req.body;
  const isManager = req.session.authLevel === "manager";
  let id = null
  if (isManager) {
    id = toUpdate.id;
  } else {
    let client = req.session;
    id = client.id;
  }

  try {
    client = await Client.findByPk(id);
    if (client == null) {
      req.sendStatus(404);
    } else {
      newData.first_name = toUpdate.first_name
        ? toUpdate.first_name
        : client.first_name;

      newData.last_name = toUpdate.last_name
        ? toUpdate.last_name
        : client.last_name;

      newData.birth_date = toUpdate.birth_date
        ? toUpdate.birth_date
        : client.birth_date;

      newData.email = toUpdate.email ? toUpdate.email : client.email;

      if (toUpdate.password != undefined) {
        const hashedPassword = await getHash(toUpdate.password);
        newData.password = hashedPassword;
      } else {
        newData.password = client.password
      }

      if (isManager) {
        newData.nb_throins = toUpdate.nb_throins
          ? toUpdate.nb_throins
          : client.nb_throins;

        newData.nb_bad_reports = toUpdate.nb_bad_reports
          ? toUpdate.nb_bad_reports
          : client.nb_bad_reports;

        newData.is_banned = toUpdate.is_banned
          ? toUpdate.is_banned
          : client.is_banned;
      } else {
        newData.nb_throins = client.nb_throins;
        newData.nb_bad_reports = client.nb_bad_reports;
        newData.is_banned = client.is_banned;
      }

      await client.update({
        first_name: newData.first_name,
        last_name: newData.last_name,
        password: newData.password,
        birth_date: newData.birth_date,
        email: newData.email,
        nb_throins: newData.nb_throins,
        nb_bad_reports: newData.nb_bad_reports,
        is_banned: newData.is_banned,
      });
      res.sendStatus(204);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

/**
 *@swagger
 *components:
 *  responses:
 *      ClientDeleted:
 *          description: The client has been deleted
 *  requestBodies:
 *      ClientToDelete:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 */
module.exports.destroy = async (req, res) => {
  const { id } = req.body;
  try {
    await sequelize.transaction(
      {
        deferrable: Sequelize.Deferrable.SET_DEFERRED,
      },
      async (t) => {
        await PersonalReward.destroy({ where: { client_id: id } });
        await Client.destroy({ where: { id } });
        res.sendStatus(204);
      }
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
