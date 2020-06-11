
const Nakamura = require("nakamura");
const Settings = require("../../../settings.json");
const Utils = require("../../Util/utils.js");

class Client extends Nakamura.Client {
  constructor(commandPath, eventPath) {
      super(Settings.token);

      this.cantTalk = new Set(); 
      this.guilds = new Map();

      this.commands = new Map();

      let files = Utils.getFilesFromDir(commandPath);
      for (let file of files) {
          file = require(`../Commands/${file}`);
          this.commands.set(file.name, file);
      }

      files = Utils.getFilesFromDir(eventPath);
      for (let file of files) {
          const fn = require(`../Events/${file}`);
          this.events.on(file.replace(".js", "").replace("/", ""), fn.bind(this));
      }

  }

  getCommand(cmdName) {
      if (this.commands.has(cmdName)) return this.commands.get(cmdName);
      for (let [, command] of this.commands) {
          if (command.aliases && command.aliases.includes(cmdName)) return command;
      }
  }

  cantTalkIn(channelId) {
      return this.cantTalk.has(channelId);
  }

  send(channelId, content, user) {
      if (user) return this.sendToUser(channelId, content);
      return this.sendToChannel(channelId, content);
  }


}

module.exports = Client;