const db = require("../services/sqlite");
const Timestamps = require("../services/timestamps");
const uuid = require("uuid/v4");

function newClaim(userId, amount) {
    return {
        id: uuid(),
        user_id: userId,
        amount: amount,
        completed_timestamp: Timestamps.today(),
    };
}

function findLastUserClaim(userId) {
    return new Promise(function (resolve, reject) {
        db.get("SELECT * FROM claims WHERE user_id = ? ORDER BY id DESC LIMIT 1", userId, (err, row) => {
            resolve(row);
        });
    });
}

function createClaim(claim) {
    db.run(
        "INSERT INTO claims (id, user_id, amount, completed_timestamp) VALUES (?, ?, ?, ?)",
        claim.id,
        claim.user_id,
        claim.amount,
        claim.completed_timestamp
    );
}
let tryToClaim = function(userId, amount) {
    return new Promise((resolve, reject) => {
        findLastUserClaim(userId).then(claim => {
            if (!claim || claim.completed_timestamp < Timestamps.today()) {
                let nclaim = newClaim(userId, amount)
                createClaim(nclaim);
                resolve(nclaim);
            } else {
              reject('This claim exists')
            }
        });
    });
};

module.exports = tryToClaim;
