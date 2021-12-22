const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getHash = (string) => bcrypt.hash(string, saltRounds);

module.exports.compareHash = (string, hash) => bcrypt.compare(string, hash);

module.exports.randomString = (length = 10) => {
    return Math.random().toString(16).substring(0, length);
};

module.exports.checkEmail =(value) => {
    if (! (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)))
        throw new Error("Bad email format. Required: yyyy-mm-dd")
}

module.exports.checkNumber = (value, label) =>{
    if (typeof value !== 'number')
        throw new Error("{label} must be a number")
}

module.exports.requiredField = (value, label) => {
    if (value == undefined || value == null)
        throw new Error("{label} is required")
}