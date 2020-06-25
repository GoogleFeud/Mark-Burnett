
module.exports = {
    name: "delete",
    execute: async (message, args, client) => {
        const guild = await client.db.guilds.get(message.guild_id);
        // TODO
}
}