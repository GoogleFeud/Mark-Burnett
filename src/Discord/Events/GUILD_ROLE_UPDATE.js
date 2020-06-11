

module.exports = function(data) {
  const member = this.guilds.get(data.guild_id);
  if (!member.roles.has(data.role.id)) return;
  if (data.role.permissions )
  member.basePerms |= data.role.permissions;
}