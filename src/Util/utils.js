

const fs = require("fs");

function getFilesFromDir(dir, folderName) {
    const things = fs.readdirSync(dir);
    const files = [];
    for (let thing of things) {
        thing = `/${thing}`;
        const stats = fs.statSync(dir + thing);
        if (stats.isDirectory()) files.push(...getFilesFromDir(dir + thing, (folderName) ? folderName + thing:thing));
        else files.push((folderName) ? folderName + thing:thing)
    }
    return files;
}

function calcRolePerms(guild, memberRoles) {
    let total = guild.roles.find(r => r.id === guild.id).permissions;
    for (let role of memberRoles) {
        let prole = guild.roles.find(r => r.id === role);
        total |= prole.permissions;
    }
    return total;
}

function calcOverwrites(rolePerms, guildId, member, channel) {
    const overwrites = new Map(channel.permission_overwrites.map(o => [o.id, o]));
    const everyone = overwrites.get(guildId);
    if (everyone) {
        rolePerms &= ~everyone.deny
        rolePerms |= everyone.allow
    }
    let Allow = 0;
    let Deny = 0;
    for (let roleId of member.roles) {
        const overwrite = overwrites.get(roleId);
        if (overwrite) {
            Allow |= overwrite.allow;
            Deny |= overwrite.deny;
        }
    }
    rolePerms &= ~Deny;
    rolePerms |= Allow;

    const ovMember = overwrites.get(member.id);
    if (ovMember) {
        rolePerms &= ~ovMember.deny;
        rolePerms += ovMember.allow;
    }
    return rolePerms;
}

module.exports = {
    getFilesFromDir,
    calcRolePerms,
    calcOverwrites
}