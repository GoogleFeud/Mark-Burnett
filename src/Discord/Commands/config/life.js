

module.exports = {
    name: "life",
    execute: async (message, args, client) => {
        const you = client.db.users.createOrGet({_id: message.author.id});
        client.send(message.channel_id, "New life! :sperm:");
    }
}