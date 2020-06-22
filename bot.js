
const Database = require("./src/Database/Database.js");
const Client = require("./src/Discord/API/Client.js");
const Settings = require("./settings.json");

if (!Settings.db) {
Database.startServer().then(() => {
    const db = new Database();
    db.connect("mongodb://localhost:27017")
    const bot = new Client("./src/Discord/Commands/", "./src/Discord/Events/", db);
    bot.connect();
});
}else {
    if (Settings.db.includes("<dbname>")) Settings.db = Settings.db.replace("<dbname>", "survivor");
    const db = new Database();
    db.connect(Settings.db).then(() => {
        const bot = new Client("./src/Discord/Commands/", "./src/Discord/Events/", db);
        bot.connect();
    });
}
