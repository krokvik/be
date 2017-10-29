const db = require("../services/sqlite");
const Timestamps = require("../services/timestamps");

function newClaim(userId, amount) {
    return {
        user_id: userId,
        amount: amount,
        lastTimestamp: Timestamps.today(),
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
        "INSERT INTO claims (user_id, amount, completed_timestamp) VALUES (?, ?, ?)",
        claim.userId,
        claim.amount,
        claim.completedTimestamp
    );
}
let tryToClaim = function(userId, amount) {
    return new Promise((resolve, reject) => {
        findLastUserClaim(userId).then(claim => {
            if (!claim || claim.completed_timestamp < Timestamps.today()) {
                newClaim = newClaim(userId, amount)
                createClaim(newClaim);
                resolve(newClaim);
            } else {
              reject('This claim exists')
            }
        });
    });
};

module.exports = tryToClaim;
