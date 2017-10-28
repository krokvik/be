module.exports = class User {
    constructor(id, name, lastTimestamp) {
        this.id = id;
        this.name = name;
        this.wallet = null;
        this.lastTimestamp = lastTimestamp;
    }

    toArray() {
        return {
            id: this.id,
            name: this.name,
            wallet: this.wallet,
            lastTimestamp: this.lastTimestamp,
        };
    }
};
