const maxDailyReward = 100;
const maxDailySteps = 10000;
const severityRatio = 1.6

// https://www.desmos.com/calculator/ethyhe7o3m

function getDailyReward(steps) {
    const reward = maxDailyReward * Math.pow(steps / (2 * maxDailySteps - steps), severityRatio);
    return Math.min(maxDailyReward, Math.round(reward));
}

module.exports = function (googleApiClient, startTimestamp, endTimestamp) {
    return new Promise(function (resolve, reject) {
        googleApiClient.getActivity(
            startTimestamp,
            endTimestamp,
            response => {
                var steps = response.bucket[0].dataset[0].point.reduce((sum, item) => {
                    return sum + item.value[0].intVal;
                }, 0);
                console.log('steps = ' + steps);
                resolve({
                    reward: getDailyReward(steps),
                    steps: steps,
                });
            }
        );
    });
}