const db = require("../services/sqlite");

function newClaim(userId, amount) {
    return {
        name: name,
        user_id: userId,
        amount: amount,
        lastTimestamp: Timestamps.today(),
    };
}

function findLastUserClaim(userId) {
    return new Promise(function (resolve, reject) {
        db.get("SELECT * FROM claims WHERE user_id = ? ORDER BY id DESC LIMIT 1", id, (err, row) => {
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

module.exports.tryToClaim = function(userId, amount) {
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
