

module.exports = function(member) {
    if (this.id !== member.id) return;

    const bot = this.guilds.get(member.guild_id);
    if (!bot) return;
    bot.patch(member);
} 