
const Database = require("./src/Database/Database.js");
const Client = require("./src/Discord/API/Client.js");

Database.startServer().then(async () => {
    const db = new Database();
    db.connect("mongodb://localhost:27017")
    const bot = new Client("./src/Discord/Commands/", "./src/Discord/Events/", db);
    bot.connect();
});
