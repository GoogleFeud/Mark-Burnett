

const Client = require("./src/Discord/API/Client.js");

const bot = new Client("./src/Discord/Commands/");

bot.connect();