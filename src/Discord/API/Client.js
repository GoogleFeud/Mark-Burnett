
const Nakamura = require("nakamura");
const Settings = require("../../../settings.json");
const Utils = require("../../Util/utils.js");

class Client extends Nakamura.Client {
  constructor(commandPath, eventPath, database) {
      super(Settings.token);

      this.commands = new Map();
      this.db = database;

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

  async send(channelId, content, user) {
      try {
      if (user) return await this.sendToUser(channelId, content);
      return await this.sendToChannel(channelId, content);
      }catch(err) {
          return;
      }
  }


}

module.exports = Client;