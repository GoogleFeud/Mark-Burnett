
const { MongoClient }= require("mongodb");
const {exec, execFile} = require("child_process");
const Defaults = require("./Defaults.js");
const User = require("./Objects/User.js");

module.exports = class Database extends MongoClient {
    constructor() {
        super();
    }

    async connect(uri, opts) {
        this.client = await MongoClient.connect(uri, opts);
        this.db = this.client.db("game-of-life");
        this.users = new Defaults.DefaultCache(this.db.collection("users"), User, {coins: 0, gold: 1, inventory: []});
    }

    static startServer() {
        return new Promise(res => {
            exec(`${__dirname}/mongodb/bin/mongod.exe --dbpath "${__dirname}/mongodb/data"`);
            setTimeout(res, 3000);
        });
    }

}