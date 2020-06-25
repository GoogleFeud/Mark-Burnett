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
App.use(Express.static(`${__dirname}/static`))


App.use(Express.urlencoded({ extended: false }));
App.use(Express.json());

App.get("/", (req, res) => {
   res.sendFile(`${__dirname}/index.html`);
});

App.get("/api/saves/:saveId", async (req, res) => {
   const save = await db.saves.get(req.params.saveId);
   if (!save) return res.sendStatus(404);
   res.json({
      save: save.serialize(),
      players: await db.players.mapAll(p => p.serialize(), {saveId: req.params.saveId}),
      tribes: await db.tribes.mapAll(t => t.serialize(), {saveId: req.params.saveId}),
      locations: await db.locations.mapAll(l => l.serialize(), {saveId: req.params.saveId})
   });
});

App.patch("/api/saves/:saveId/players/:playerId", async (req, res) => {
     console.log(req.body);
     await db.players.update(req.params.playerId, req.body);
     res.json(req.body);
});

/**App.get("/api/:saveId/players", (req, res) => {

}) **/


App.listen(Settings.port || 5000, () => {
  if (!master) db.connect(`mongodb+srv://${Settings.username}:${Settings.password}@cluster0-grxvc.mongodb.net/survivor?retryWrites=true&w=majority`)
});


}