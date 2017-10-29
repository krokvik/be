// const db = require("../services/sqlite");
// const Timestamps = require("../services/timestamps");
//
// function newUser(id, name) {
//     return {
//         id: id,
//         name: name,
//         wallet: null,
//         lastTimestamp: Timestamps.now(),
//     };
// }
//
// function findUser(id) {
//     return new Promise(function (resolve, reject) {
//         db.get("SELECT * FROM users WHERE id = ?", id, (err, row) => {
//             resolve(row);
//         });
//     });
// }
//
// function createUser(user) {
//     db.run(
//         "INSERT INTO users (id, name, wallet, lastTimestamp) VALUES (?, ?, ?, ?)",
//         user.id,
//         user.name,
//         user.wallet,
//         user.lastTimestamp
//     );
// }
//
// module.exports.findOrCreateUser = function(id, name) {
//     return new Promise(function (resolve, reject) {
//         findUser(id).then(user => {
//             if (!user) {
//                 user = newUser(id, name);
//                 createUser(user);
//             }
//
//             resolve(user);
//         });
//     });
// };
