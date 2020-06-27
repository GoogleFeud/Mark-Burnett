

module.exports = {
    method: "patch",
    route: "/api/saves/:saveId/players/:playerId",
    handle: async (db, req, res) => {
        await db.players.update(req.params.playerId, req.body);
        res.json(req.body);
    }
}