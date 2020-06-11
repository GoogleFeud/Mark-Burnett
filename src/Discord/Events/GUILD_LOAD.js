
const Constants = require("../../Util/constants.js");
const Util = require("../../Util/utils.js");

const BotMember = require("../API/Structures/BotMember.js");

module.exports = function(guild) {

    /** Handle the permissions of the bot member */
        const botMember = new BotMember(guild.members.find(m => m.id === this.id));
        this.guilds.set(guild.id, botMember);
        const perm = Util.calcRolePerms(guild, botMember.roles);
        botMember.setBasePerms(perm);
        if (perm & Constants.adminPerm) return;// this.guildPerms.set(guild.id, true);
    
        /** Handle overwrites */
        for (let channel of guild.channels) {
            if (channel.type !== 0) continue;
            if (!(Util.calcOverwrites(perm, guild.id, botMember, channel) & Constants.sendMessagesPerm)) this.cantTalk.add(channel.id);
        }

}

