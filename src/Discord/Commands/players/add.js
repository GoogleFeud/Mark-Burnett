
const Nakamura = require("nakamura").Util;
const Util = require("../../../Util/utils.js");

module.exports = {
    name: "add",
    execute: async (message, args, client) => {
        const allowBits = new Util.Bitfield(Nakamura.PERMISSIONS.SEND_MESSAGES).bits;
        const denyBits = new Util.Bitfield(Nakamura.PERMISSIONS.VIEW_CHANNEL).bits;
        const guild = await client.db.guilds.get(message.guild_id);
        for (let user of message.mentions) {
            await client.db.players.create({_id: user.id + guild.saveId, name: user.member.nickname || user.username, saveId: guild.saveId});
            if (client.settings.botSettings && client.settings.botSettings.confessionalCategoryId) {
                client.createGuildChannel(message.guild_id, {
                    name: user.username,
                    type: 0, // Text
                    parent_id: client.settings.botSettings.confessionalCategoryId,
                    permission_overwrites: [
                        {type: "member", id: user.id, allow: allowBits},
                        {type: "role", id: message.guild_id, deny: denyBits}
                    ]
                });
            }
        }
        return "Added user(s) to database!";
    } 
}