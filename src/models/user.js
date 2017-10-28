module.exports = class User {
    constructor(id, name, lastTimestamp) {
        this.id = id;
        this.name = name;
        this.address = null;
        this.lastTimestamp = lastTimestamp;
    }

    toArray() {
        return {
            id: this.id,
            name: this.name,
            address: this.address,
            lastTimestamp: this.lastTimestamp,
        };
    }
};
