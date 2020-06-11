

module.exports = {
    name: "help",
    execute: (message, args, client) => {
        client.send(message.channel_id, "Help incoming!");
        console.log(client.guilds, client.cantTalk);
    } 
}