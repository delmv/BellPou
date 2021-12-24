require("dotenv").config();
const process = require("process");
const jwt = require("jsonwebtoken");

const Client = require("../models/Client");
const Manager = require("../models/Manager");
const { compareHash } = require("../utils/utils");

const {validationResult} = require("express-validator");

module.exports.getUser = async (email, password) => {
  const client = await Client.findOne({ where: { email } });
  const manager = await Manager.findOne({ where: { email } });
  if (client && (await compareHash(password, client.password))) {
    return { userType: "client", value: client };
  } else if (manager && (await compareHash(password, manager.password))) {
    return { userType: "manager", value: manager };
  } else {
    return { userType: "inconnu", value: null };
  }
};

/**
 *@swagger
 *components:
 *  responses:
 *      Logged:
 *          description: The used is logged !
 *  requestBodies:
 *      Login:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                            type: string
 *                            format: email
 *                          password:
 *                            type: string
 *                      required:
 *                        - email
 *                        - password
 */
module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.status(400).json({errors: errors.array() })
  else {
    const { email, password } = req.body;
    try {
      const result = await this.getUser(email, password);
      const { userType, value } = result;
      if (userType === "inconnu") {
        res.sendStatus(404);
      } else {
        const { id, last_name, first_name } = value;
        const payload = {
          status: userType,
          value: { id, last_name, first_name },
        };
        const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
          expiresIn: "1d",
        });
        res.json(token);
      }
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
};

/**
 * @swagger
 * components:
 *  responses:
 *      UserFound:
 *           description: Return the user in session
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Client'
 */
module.exports.getUserSession = async (req, res) => {
  if (req.session !== undefined) {
    let user = null
    if (req.session.authLevel === "manager") {
      user = await Manager.findByPk(req.session.id)
    } else {
      user = await Client.findByPk(req.session.id)
    }
    res.json(user)
  } else {
    return res.sendStatus(401);
  }
}
