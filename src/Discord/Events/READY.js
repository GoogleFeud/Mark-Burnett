

module.exports = function(info, shard) {
    this.id = info.id;
    console.log(`Shard ${shard.shardId} is ready!`);
}