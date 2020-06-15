const Settings = require("../../../settings.json");

module.exports = async function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(Settings.prefix)) return;
    if (!message.guild_id) return;

    const args = message.content.slice(Settings.prefix.length).replace(/\s+/g, " ").trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const command = this.getCommand(cmdName);
    if (!command) return;

    if (command.fetchUser) message.author.db = await this.db.users.get(message.author.id);
    try {
        const res = await command.execute(message, args, this);
        if (typeof res === "string") this.sendToChannel(message.channel_id, res);
    }catch(err) {
        this.sendToChannel(message.channel_id, `Error: ${err}`);
    }
}