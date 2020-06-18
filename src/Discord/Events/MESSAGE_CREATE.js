const Settings = require("../../../settings.json");

/**const listeners = {};

function listenForMessages(channelId, options) {
  return new Promise(res => {
    options.resolve = (messages) => {
        res(messages);
        listeners.splice(listeners.indexOf(options), 1);
    }
    options.results = [];
    if (!listeners[channelId]) listeners[channelId] = [];
    listeners[channelId].push(options);
  });
}

function checkListener(listener, message) {
    if (listener.filter && !listener.filter(message)) return;
    options.results.push(message);
    if (listener.size === listener.results.length) return listener.resolve(listener.results);

} **/

module.exports = async function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(Settings.prefix)) return;
    if (!message.guild_id) return;

  /**  if (listeners[message.channel_id]) {
        const _listeners = listeners[message.channel_id];
        for (let listener of _listeners) {
        checkListener(listener, message);
        }
    } **/

    const args = message.content.slice(Settings.prefix.length).replace(/\s+/g, " ").trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const command = this.getCommand(cmdName);
    if (!command) return;
    
    try {
        const res = await command.execute(message, args, this, {listenForMessages});
        if (typeof res === "string") this.sendToChannel(message.channel_id, res);
    }catch(err) {
        this.sendToChannel(message.channel_id, `Error: ${err}`);
    }
}