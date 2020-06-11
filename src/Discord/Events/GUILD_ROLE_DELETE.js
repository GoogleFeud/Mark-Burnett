



module.exports = function(data) {
    const member = this.guilds.get(data.guild_id);
    if (!member.roles.has(data.role_id)) return;
    member.roles.delete(data.role_id);
  }