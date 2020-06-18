
const Nakamura = require("nakamura");
const Settings = require("../../../settings.json");
const Utils = require("../../Util/utils.js");
const Constants = require("../../Util/constants.js");

class Client extends Nakamura.Client {
  constructor(commandPath, eventPath, database) {
      super(Settings.token);

      this.commands = new Map();
      this.db = database;

      let files = Utils.getFilesFromDir(commandPath);
      for (let file of files) {
          file = require(`../Commands/${file}`);
          if (file.init) file.init(file, Utils, Constants);
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

  async send(channelId, content, user) {
      try {
      if (user) return await this.sendToUser(channelId, content);
      return await this.sendToChannel(channelId, content);
      }catch(err) {
          console.log(err);
          return;
      }
  }


}

module.exports = Client;