
const { MongoClient }= require("mongodb");
const { exec } = require("child_process");
const Defaults = require("./Defaults.js");
const Player = require("./Objects/Player.js");
const Save = require("./Objects/Save.js");
const Guild = require("./Objects/Guild.js");
const Location = require("./Objects/Location.js");

module.exports = class Database extends MongoClient {
    constructor() {
        super();
    }

    async connect(uri, opts) {
        this.client = await MongoClient.connect(uri, opts);
        this.db = this.client.db("survivor");
        this.players = new Defaults.DefaultCache(this.db.collection("players"), Player, {});
        this.saves = new Defaults.DefaultCache(this.db.collection("saves"), Save, {});
        this.guilds = new Defaults.DefaultCache(this.db.collection("guilds"), Guild, {});
        this.locations = new Defaults.DefaultCache(this.db.collection("locations"), Location, {});
    }

    static startServer() {
        return new Promise(res => {
            exec(`${__dirname}/mongodb/bin/mongod.exe --dbpath "${__dirname}/mongodb/data"`);
            setTimeout(res, 3000);
        });
    }

}