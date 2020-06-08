
const Nakamura = require("nakamura");
const Settings = require("../../../settings.json");
const Utils = require("../../Util/utils.js");

class Client extends Nakamura.Client {
  constructor(folderPath) {
      super(Settings.token);
      this.me = new Map(); // The bot in every guild
      this.commands = new Map();

      require("../events.js")(this);

      const files = Utils.getFilesFromDir(folderPath);
      for (let file of files) {
          file = require(`../Commands/${file}`);
          this.commands.set(file.name, file);
      }

  }

  getCommand(cmdName) {
      if (this.commands.has(cmdName)) return this.commands.get(cmdName);
      for (let [, command] of this.commands) {
          if (command.aliases && command.aliases.includes(cmdName)) return command;
      }
  }

  send(channelId, content, user) {
      if (user) return this.sendToUser(channelId, content);
      return this.sendToChannel(channelId, content);
  }


}

module.exports = Client;