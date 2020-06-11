const Settings = require("../../../settings.json");

module.exports = function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(Settings.prefix)) return;
    if (!message.guild_id) return;

    const args = message.content.slice(Settings.prefix.length).replace(/\s+/g, " ").trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const command = this.getCommand(cmdName);
    if (!command) return;

    try {
        command.execute(message, args, this);
    }catch(err) {
        this.sendToChannel(message.channel_id, `Error: ${err}`);
    }
}