
const Nakamura = require("nakamura");
const Utils = require("../../Util/utils.js");

class Client extends Nakamura.Client {
  constructor(commandPath, eventPath, database, Settings) {
      super(Settings.token);

      this.commands = new Map();
      this.settings = Settings;
      this.db = database;

      let files = Utils.getFilesFromDir(commandPath);
      for (let file of files) {
          const fileObj = require(`${process.cwd()}/src/Discord/Commands/${file}`);
          const arr = file.split("/");
          if (arr.length === 3) fileObj.name = arr[1] + fileObj.name;
          this.commands.set(fileObj.name, fileObj);
      }

      files = Utils.getFilesFromDir(eventPath);
      for (let file of files) {
          const fn = require(`${process.cwd()}/src/Discord/Events/${file}`);
          this.events.on(file.replace(".js", "").replace("/", ""), fn.bind(this));
      }

  }

  getCommand(cmdName) {
      if (this.commands.has(cmdName)) return this.commands.get(cmdName);
      for (let [, command] of this.commands) {
          if (command.aliases && command.aliases.includes(cmdName)) return command;
      }
  }

  run(cmdName, ...params) {
      const cmd = this.getCommand(cmdName);
      if (cmd) cmd.execute(...params);
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