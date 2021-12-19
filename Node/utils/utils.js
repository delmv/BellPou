const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getHash = (string) => bcrypt.hash(string, saltRounds);

module.exports.compareHash = (string, hash) => bcrypt.compare(string, hash);

module.exports.randomString = (length = 10) => {
    return Math.random().toString(16).substring(0, length);
};
