
const Database = require("./src/Database/Database.js");
const Client = require("./src/Discord/API/Client.js");
const Settings = require("./settings.json");
const Server = require("./src/Dashboard/server.js");


if (!Settings.username || !Settings.password) {
Database.startServer().then(() => {
    const db = new Database();
    db.connect("mongodb://localhost:27017")
    const bot = new Client("./src/Discord/Commands/", "./src/Discord/Events/", db);
    bot.connect();
    Server(db);
});
}else if (Settings.username && Settings.password) {
    const db = new Database();
    db.connect(`mongodb+srv://${Settings.username}:${Settings.password}@cluster0-grxvc.mongodb.net/survivor?retryWrites=true&w=majority`).then(() => {
        const bot = new Client("./src/Discord/Commands/", "./src/Discord/Events/", db);
        bot.connect();
        Server(db);
    });
}
