
module.exports = function(data) {
    if (data.user.id !== this.id) return;
    this.guilds.delete(data.guild_id);
} 