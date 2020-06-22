
class DefaultObject {
    constructor(collection, data) {
        this.collection = collection;
        this.id = data._id;
    }

    serialize() {
        const res = {};
        for (let i in this) {
            if (i !== "collection") res[i] = this[i];
        }
        return res;
    }

    update(obj) {
        Object.assign(this, obj);
        return this.collection.updateOne({_id: this.id}, {$set: obj});
    }

    inc(key, v = 1) {
        this[key] += v;
        return this.collection.updateOne({_id: this.id}, {$set: {[key]: this[key]}})
    }

    dec(key, v = 1) {
        this[key] -= v;
        return this.collection.updateOne({_id: this.id}, {$set: {[key]: this[key]}})
    }

    delete() {
        return this.collection.deleteOne({_id: this.id});
    }

}

class DefaultCache extends Map {
    constructor(collection, ObjClass, maxSize) {
        super();
        this.limit = maxSize || 1000;
        this.collection = collection;
        this.ObjectClass = ObjClass;
        this._keyCache = [];
    }

    create(data) {
        data = Object.assign({}, this.ObjectClass.default || {}, data);
        this.collection.insertOne(data);
        if (this.size > this.limit) this.shift();
        this._keyCache.push(data._id);
        return new this.ObjectClass(this.collection, data);
    }

    async get(id) {
        if (super.has(id)) return super.get(id);
        const entry = await this.collection.findOne({_id: id});
        if (!entry) return null;
        const cl = new this.ObjectClass(this.collection, entry);
        if (this.size > this.limit) this.shift();
        this._keyCache.push(id);
        this.set(cl.id, cl);
        return cl;
    }

    async has(id) {
        if (super.has(id)) return true;
        const entry = await this.collection.findOne({_id: id});
        if (!entry) return false;
        const cl = new this.ObjectClass(this.collection, entry);
        if (this.size > this.limit) this.shift();
        this._keyCache.push(id);
        this.set(cl.id, cl);
        return cl;
    }
 
    update(id, data) {
        if (super.has(id)) {
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

    async all() {
        if (await this.size() === super.size) return [...this.values()];
        const all = await this.collection.find();
        const arr = await all.toArray();
        for (let item of arr) {
            this.set(item._id, new this.ObjectClass(this.collection, item));
        }
        return arr;
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