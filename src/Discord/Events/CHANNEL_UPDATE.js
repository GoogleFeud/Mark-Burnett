
const Constants = require("../../Util/constants.js");
const Util = require("../../Util/utils.js");

module.exports = function(channel) {
    if (!channel.guild_id || channel.type !== 0) return;
    const member = this.guilds.get(channel.guild_id);
    console.log(Util.calcOverwrites(member.permissions, channel.guild_id, member, channel) & Constants.sendMessagesPerm);
    if (!(Util.calcOverwrites(member.permissions, channel.guild_id, member, channel) & Constants.sendMessagesPerm)) this.cantTalk.add(channel.id);
    else this.cantTalk.delete(channel.id);
}