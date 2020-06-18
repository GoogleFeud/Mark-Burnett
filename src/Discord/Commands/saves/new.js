
module.exports = {
    name: "new",
    execute: async (message, args, client) => {
        if (!args.length) return "You must specify an ID for the save!";
        client.db.saves.create({
            _id: args[0]
        });
        let guild = await client.db.guilds.get(message.guild_id); 
        if (!guild) await client.db.guilds.create({_id: message.guild_id, saveId: args[0]});
        else guild.update({saveId: args[0]});
        return `Created a new save with id \`${args[0]}\`! Applied the new save to this server.`;
    }  
}