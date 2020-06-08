const Settings = require("../../settings.json");

module.exports = (client) => {


    client.events.on("MESSAGE_CREATE", message => {
        if (message.author.bot) return;
        if (!message.content.startsWith(Settings.prefix)) return;
        if (!message.guild_id) return;

        const args = message.content.slice(Settings.prefix.length).replace(/\s+/g, " ").trim().split(/ +/);
        const cmdName = args.shift().toLowerCase();
        
        const command = client.getCommand(cmdName);
        if (!command) return;

        try {
            command.execute(message, args, client);
        }catch(err) {
            client.sendToChannel(message.channel_id, `Error: ${err}`);
        }
    });


}