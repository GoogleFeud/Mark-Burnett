

module.exports = {
    method: "get",
    route: "/api/saves/:saveId",
    handle: async (db, req, res) => {
        const save = await db.saves.get(req.params.saveId);
        if (!save) return res.sendStatus(404);
        res.json({
           save: save.serialize(),
           players: await db.players.mapAll(p => p.serialize(), {saveId: req.params.saveId}),
           tribes: await db.tribes.mapAll(t => t.serialize(), {saveId: req.params.saveId}),
           locations: await db.locations.mapAll(l => l.serialize(), {saveId: req.params.saveId})
        });
    }
}