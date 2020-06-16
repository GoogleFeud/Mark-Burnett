

function formStats(percentage) {
    percentage = Math.round(percentage / 10);
    const greenbarEmoji = "<greenbar:722114599838548071> ";
    const graybarEmoji = "<graybar:722114592402047136> ";
    let final = "";
    for (let i=0; i < 100; i++) {
        if (i > percentage) final += graybarEmoji;
        else final+= greenbarEmoji;
    }
    return final;
}

module.exports = {
    name: "life",
    aliases: ["mylife"],
    init: (cmd, Util, C) => {
        cmd.details = Util.bitfield(C.COMMAND_DETAILS.FETCH_USER_FROM_DB);
        delete cmd.init;
    },
    execute: async (message, args, client) => {
        if (message.author.db) {
            const cAvi = client.urlUserAvatar(message.author.id, message.author.avatar);
            const e = {
                title: "Your life",
               author: {name: message.author.username, icon_url: cAvi},
                thumbnail: {url: cAvi},
                fields: [
                    {
                        name: "💶 Money",
                        value: message.author.db.coins,
                        inline: true
                    },
                    {
                        name: "🎟️ Tickets",
                        value: message.author.db.tickets || 1,
                        inline: true
                    },
                ]
            };
        if (message.author.db.marriedTo) e.fields.push({name: "💍 Married to", value: `<@${message.author.db.marriedTo}>`, inline: true});
        e.fields.push({
            name: "❤️ Health",
            value: formStats(message.author.db.health)
        })
        e.fields.push({
            name: "📦 Inventory",
            value: "Empty!" // for now :)
        });
        client.send(message.channel_id, {embed: e});
        }else {
        client.db.users.create({_id: message.author.id});
        client.send(message.channel_id, "New life! :sperm:");
        }

    }
}