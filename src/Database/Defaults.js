
class DefaultObject {
    constructor(collection, data) {
        this.collection = collection;
        this.id = data._id;
    }

    update(obj) {
        Object.assign(this, obj);
        return this.collection.updateOne({_id: this.id}, {$set: obj});
    }

    delete() {
        return this.collection.deleteOne({_id: this.id});
    }

}

class DefaultCache extends Map {
    constructor(collection, ObjClass, DefaultArgs, maxSize) {
        super();
        this.limit = maxSize || 100;
        this.collection = collection;
        this.ObjectClass = ObjClass;
        this.defaultArgs = DefaultArgs;
        this._keyCache = [];
    }

    create(data) {
        data = Object.assign({}, this.defaultArgs, data);
        this.collection.insertOne(data);
        this._keyCache.push(data._id);
        return new this.ObjectClass(this.collection, data);
    }

    async get(id) {
        if (this.has(id)) return super.get(id);
        const entry = await this.collection.findOne({_id: id});
        if (!entry) return null;
        const cl = new this.ObjectClass(this.collection, entry);
        if (this.size > this.limit) this.shift();
        this._keyCache.push(id);
        this.set(cl.id, cl);
        return cl;
    }
 
    update(id, data) {
        if (this.has(id)) {
            const entry = this.get(id);
            Object.assign(entry, data);
        }
        return this.collection.updateOne({_id: id}, {$set: data});
    }

    delete(id) {
        super.delete(id);
        this._keyCache = [...this.keys()];
        return this.collection.deleteOne({_id: id});
    }

    all() {
        return this.collection.find();
    }

    size(maxTimeMS = 2000) {
        return this.collection.estimatedDocumentCount({maxTimeMS})
    }

    shift() {
        super.delete(this._keyCache[0]);
    }

}

module.exports = {
    DefaultObject,
    DefaultCache
}