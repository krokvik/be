module.exports.now = function () {
    return Date.now();
};

module.exports.today = function () {
    return new Date().setHours(0,0,0,0);
};

module.exports.yesterday = function () {
    return new Date().setHours(0,0,0,0) - 86400000;
};
