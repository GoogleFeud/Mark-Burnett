

module.exports = {
    name: "info",
    execute: (message, args, client) => {
        client.send(message.channel_id, `Right now, the bot uses ${Math.round(process.memoryUsage().heapUsed / (1024 * 1024))}MB of memory!`);
    } 
}