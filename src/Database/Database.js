
const { MongoClient }= require("mongodb");
const { exec } = require("child_process");
const Defaults = require("./Defaults.js");
const User = require("./Objects/User.js");
const Utils = require("../Util/utils.js");

module.exports = class Database extends MongoClient {
    constructor() {
        super();
    }

    async connect(uri, opts) {
        this.client = await MongoClient.connect(uri, opts);
        this.db = this.client.db("game-of-life");
        this.users = new Defaults.DefaultCache(this.db.collection("users"), User, {coins: 0, tickets: 1, inventory: [], fame: 0, happiness: 90, health: 100, brains: Utils.rngBtw(10, 95)});
    }

    static startServer() {
        return new Promise(res => {
            exec(`${__dirname}/mongodb/bin/mongod.exe --dbpath "${__dirname}/mongodb/data"`);
            setTimeout(res, 3000);
        });
    }

}