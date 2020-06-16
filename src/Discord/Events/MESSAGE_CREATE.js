const Settings = require("../../../settings.json");
const Constants = require("../../Util/constants.js");
module.exports = async function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(Settings.prefix)) return;
    if (!message.guild_id) return;

    const args = message.content.slice(Settings.prefix.length).replace(/\s+/g, " ").trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const command = this.getCommand(cmdName);
    if (!command) return;

    if (command.details) {
        if (command.details.has(Constants.COMMAND_DETAILS.FETCH_USER_FROM_DB)) message.author.db = await this.db.users.get(message.author.id);
    }
    
    try {
        const res = await command.execute(message, args, this);
        if (typeof res === "string") this.sendToChannel(message.channel_id, res);
    }catch(err) {
        this.sendToChannel(message.channel_id, `Error: ${err}`);
    }
}