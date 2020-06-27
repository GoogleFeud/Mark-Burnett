const Express = require("express");
const Database = require("./Database/Database.js");
const ws = require("ws");
const Util = require("./Util/utils.js");


module.exports = (Settings, db) => {
const App = Express();
let __masterP = true;

if (!db) {
   __masterP = false;
   db = new Database();
}


App.use(Express.static(`${__dirname}/client-side/static`))


App.use(Express.urlencoded({ extended: false }));
App.use(Express.json());

const routes = Util.getFilesFromDir(__dirname + "/server/routes");

for (let file of routes) {
   const route = require(`./server/routes/${file}`);
   App[route.method](route.route, route.handle.bind(null, db));
}

App.get("/", (req, res) => {
   res.sendFile(`${__dirname}/client-side/index.html`);
});

const wss = new ws.Server({server: App, path: "/ws"});

App.listen(Settings.port || 5000, async () => {
  if (!__masterP) await db.connect(`mongodb+srv://${Settings.username}:${Settings.password}@cluster0-grxvc.mongodb.net/survivor?retryWrites=true&w=majority`);

  db.players.collection.watch().on("change", (data) => {
   switch(data.operationType) {
      case "update": {
         const p = db.players.cacheGet(data.documentKey._id);
         if (p) Object.assign(p, data.updateDescription.updatedFields);
         wss.clients.forEach(c => c.send({e: "playerUpdate", c: data.updateDescription.updatedFields, id: data.documentKey._id}));
      }
   }
  });

  console.log("[INFO] Server Launched!")
});

}