module.exports.ping = (req, res) => {

    res.status(200).json({response: "pong"})

}