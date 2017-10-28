const Timestamps = require('../services/timestamps');

module.exports = function (googleApiClient) {
    return new Promise(function (resolve, reject) {
        googleApiClient.getActivity(
            Timestamps.then(),
            Timestamps.now(),
            response => {
                var steps = response.bucket[0].dataset[0].point.reduce((sum, item) => {
                    return sum + item.value[0].intVal;
                }, 0);
                console.log('steps = ' + steps);
                resolve({
                    steps: steps,
                });
            }
        );
    });
}