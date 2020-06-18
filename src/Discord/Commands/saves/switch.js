

module.exports = {
    name: "switch",
    execute: async (message, args, client) => {
        if (!args.length) return "You must specify an ID to switch to!";
        if (!await client.db.saves.has(args[0])) return "This save doesn't exist!";
        let guild = await client.db.guilds.get(message.guild_id); 
        if (!guild) {
            await client.db.guilds.create({_id: message.guild_id, saveId: args[0]});
            return `Set this server's save to \`${args[0]}\``;
        }
        else{
            guild.update({saveId: args[0]});
            return `Set this server's save to \`${args[0]}\``;
        }
    }  
}