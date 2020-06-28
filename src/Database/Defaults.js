class DefaultObject {
    constructor(collection, data) {
        this.collection = collection;
        this.id = data._id;
        Object.assign(this, data);
    }

    serialize() {
        const res = {};
        for (let i in this) {
            if (i !== "collection" && !i.startsWith("_")) res[i] = this[i];
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
    constructor(collection, ObjClass) {
        super();
        this.collection = collection;
        this.ObjectClass = ObjClass;
        this._valCache = [];
    }

    create(data) {
        data = Object.assign({}, this.ObjectClass.default || {}, data);
        this.collection.insertOne(data);
        this._valCache = null;
        return new this.ObjectClass(this.collection, data);
    }

    cacheHas(key) {
        return super.has(key);
    }

    cacheGet(key) {
        return super.get(key);
    }

    async get(id) {
        if (super.has(id)) return super.get(id);
        const entry = await this.collection.findOne({_id: id});
        if (!entry) return null;
        const cl = new this.ObjectClass(this.collection, entry);
        this.set(cl.id, cl);
        return cl;
    }

    async find(query) {
        const found = this.toArray().find(i => {
            for (let q in query) {
                if (i[q] !== query[q]) return false;
            }
            return true;
        });
        if (found) return found;
        const entry = await this.collection.findOne(query);
        if (!entry) return null;
        const cl = new this.ObjectClass(this.collection, entry);
        this.set(cl.id, cl);
        return cl;
    }

    async filter(query) {
        const found = this.toArray().filter(i => {
            for (let q in query) {
                if (i[q] !== query[q]) return false;
            }
            return true;
        });
        if (found.length) return found;
        const entries = await this.collection.find(query);
        const res = [];
        entries.forEach(e => {
            const cl = new this.ObjectClass(this.collection, e);
            this.set(cl.id, cl);
            res.push(cl);
        })
        return res;
    }

    async has(id) {
        if (super.has(id)) return true;
        const entry = await this.collection.findOne({_id: id});
        if (!entry) return false;
        const cl = new this.ObjectClass(this.collection, entry);
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

    removeField(fieldName, query) {
        for (let [, val] of this) {
            if (query) {
                if (DefaultCache.matchesQuery(val, query)) delete val[fieldName];
            }
            else delete val[fieldName];
        }
        return this.collection.updateMany(query || {}, {$unset: {[fieldName]: 1}} , {multi: true});
    }

    delete(id) {
        super.delete(id);
        this._valCache = null;
        return this.collection.deleteOne({_id: id});
    }


    async mapAll(mapFn, query = {}) {
        const all = await this.collection.find(query);
        const res = [];
        await all.forEach(entry => {
            res.push(mapFn(new this.ObjectClass(this.collection, entry)));
        });
        return res;
    }

    async sync() {
        const all = await this.collection.find();
        all.forEach(entry => {
            this.set(entry._id, new this.ObjectClass(this.collection, entry));
        });
    }

    toArray() {
        if (!this._valCache) this._valCache = [...this.values()];
        return this._valCache;
    }

    static matchesQuery(obj, query) {
        for (let key in query) {
            if (obj[key] != query[key]) return false;
        }
        return true;
    }


}

module.exports = {
    DefaultObject,
    DefaultCache
}