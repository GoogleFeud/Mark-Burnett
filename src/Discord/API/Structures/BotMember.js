
const Constants = require("../../../Util/constants.js");

module.exports = class BotMember {
    constructor(data) {
        this.patch(data); 
    }

    patch(data) {
        this.roles = new Set(data.roles);
    }

    setBasePerms(perms) {
        this.permissions = perms;
    }

    get canTalk() {
        return this.permissions & Constants.sendMessagesPerm;
    }

}