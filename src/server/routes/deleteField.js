

module.exports = {
    method: "delete",
    route: "/api/saves/:saveId/:colName/:fieldName",
    handle: async (db, req, res) => {
        await db[req.params.colName].removeField(req.params.fieldName, {saveId: req.params.saveId});
        res.json(req.body);
    }
}