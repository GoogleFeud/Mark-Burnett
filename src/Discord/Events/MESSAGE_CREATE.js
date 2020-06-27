const Settings = require("../../../settings.json");
 
module.exports = async function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(this.settings.prefix)) return;
    if (!message.guild_id) return;

    const args = message.content.slice(this.settings.prefix.length).replace(/\s+/g, " ").trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const command = this.getCommand(cmdName) || this.getCommand(cmdName + args.shift());
    if (!command) return;
    
    try {
        const res = await command.execute(message, args, this);
        if (typeof res === "string") this.sendToChannel(message.channel_id, `> ${res}`);
    }catch(err) {
        this.sendToChannel(message.channel_id, `Error: ${err}`);
    }
}