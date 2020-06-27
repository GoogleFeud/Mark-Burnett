

module.exports = function(info, shard) {
    this.id = info.id;
    console.log(`[READY] Shard ${shard.shardId} is ready!`);
}