

let Settings;

try {
  Settings = require("./settings.json");
}catch(err) {
   try {
      Settings = require("../settings.json");
   }catch(err) {
      try {
         Settings = require("../../settings.json");
      }catch(err) {
         throw new Error("Couldn't find the settings file! A settings.json file is required to run the dashboard. Make sure to make one!")
      }
   }
}
if (!Settings) throw new Error("Couldn't find the settings file! A settings.json file is required to run the dashboard. Make sure to make one!");

let Bot;

try {
    Bot = require("./bot.js")
}catch(err) {
    try {
        Bot = require("../bot.js");
    }catch(err) {
        try {
            Bot = require("../../bot.js");
        } catch(err) {}
    }
}

require("./src/index.js")(Settings, (Bot) ? Bot.db:null, Bot);


