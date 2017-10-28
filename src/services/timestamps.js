module.exports.now = function () {
    return Date.now();
};

module.exports.then = function () {
    return Date.now() - 86400000;
};
