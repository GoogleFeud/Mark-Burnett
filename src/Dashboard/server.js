

const Express = require("express");
const App = Express();

App.use(Express.static(`${__dirname}/static`))

App.get("/", (req, res) => {
   res.sendFile(`${__dirname}/index.html`);
});

App.listen(5000);
