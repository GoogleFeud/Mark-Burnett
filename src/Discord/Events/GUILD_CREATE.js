
const Constants = require("../../Util/constants.js");
const Util = require("../../Util/utils.js");

const BotMember = require("../API/Structures/BotMember.js");

module.exports = function(guild) {

    /** Handle the permissions of the bot member */
        const botMember = new BotMember(guild.members.find(m => m.id === this.id));
        this.guilds.set(guild.id, botMember);
        const perm = Util.calcRolePerms(guild, botMember.roles);
        botMember.setBasePerms(perm);

}

