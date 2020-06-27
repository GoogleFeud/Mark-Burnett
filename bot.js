
const Database = require("./src/Database/Database.js");
const Client = require("./src/Discord/API/Client.js");
const fs = require("fs");

const Settings = JSON.parse(fs.readFileSync("./settings.json", {encoding: "utf8"}));


if (!Settings.username || !Settings.password) {
Database.startServer().then(() => {
    const db = new Database();
    db.connect("mongodb://localhost:27017")
    const bot = new Client("./src/Discord/Commands/", "./src/Discord/Events/", db, Settings);
    bot.connect();
});
}
else if (Settings.username && Settings.password) {
    const db = new Database();
    db.connect(`mongodb+srv://${Settings.username}:${Settings.password}@cluster0-grxvc.mongodb.net/survivor?retryWrites=true&w=majority`)
    const bot = new Client("./src/Discord/Commands/", "./src/Discord/Events/", db, Settings);
    bot.connect();
    module.exports = bot;
}
