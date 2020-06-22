const Express = require("express");
const Database = require("../Database/Database.js");

let Settings;
let master = true;

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


module.exports = (db) => {
const App = Express();

if (!db) {
   db = new Database();
   master = false;
}

App.use(Express.json());
App.use(Express.static(`${__dirname}/static`))

App.get("/", (req, res) => {
   res.sendFile(`${__dirname}/index.html`);
});

/**App.get("/api/:saveId/players", (req, res) => {

}) **/


App.listen(5000, () => {
  if (!master) db.connect(`mongodb+srv://${Settings.username}:${Settings.password}@cluster0-grxvc.mongodb.net/survivor?retryWrites=true&w=majority`)
});


}