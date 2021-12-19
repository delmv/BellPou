const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getHash = (string) => bcrypt.hash(string, saltRounds);

module.exports.compareHash = (string, hash) => bcrypt.compare(string, hash);

module.exports.randomString = (length = 10) => {
    return Math.random().toString(16).substring(0, length);
};
/* 
module.exports.checkName = (value, string) => {
    
}

module.exports.checkDate = (date) => {
    
}
module.exports.checkEmail = (email) => {
    this.checkUndefined(email);
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        throw new Error("L'email n'est pas valide");
    }
    
}
module.exports.checkUndefined = (value, string) =>{
    if (value === undefined) {
        throw new Error(`${string} est obligatoire `);
    }
}
 */

