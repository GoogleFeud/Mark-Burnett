
class DefaultObject {
    constructor(collection, data) {
        this.collection = collection;
        this.id = data._id;
        Object.assign(this, data);
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

    async get(id) {
        if (super.has(id)) return super.get(id);
        const entry = await this.collection.findOne({_id: id});
        if (!entry) return null;
        const cl = new this.ObjectClass(this.collection, entry);
        this.set(cl.id, cl);
        return cl;
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

    delete(id) {
        super.delete(id);
        this._valCache = null;
        return this.collection.deleteOne({_id: id});
    }

    filter(query) {
      return this.collection.find(query);   
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


}

module.exports = {
    DefaultObject,
    DefaultCache
}