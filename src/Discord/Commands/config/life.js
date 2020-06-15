

module.exports = {
    name: "life",
    aliases: ["mylife"],
    fetchUser: true,
    execute: async (message, args, client) => {
        if (message.author.db) return "You already have a life! (or do you?)";
        client.db.users.createOrGet({_id: message.author.id});
        client.send(message.channel_id, "New life! :sperm:");
    }
}