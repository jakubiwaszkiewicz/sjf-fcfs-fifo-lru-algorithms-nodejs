function findWaitingTime(countOfProcesses, burstTime, waitTime, arrivalTime) {
    let serviceTime = Array.from({length: countOfProcesses}, () => 0);
    serviceTime[0] = arrivalTime[0];
    waitTime[0] = 0;

    for (let i = 1; i < countOfProcesses; i++) {
        let wasted = 0;
        serviceTime[i] = serviceTime[i - 1] + burstTime[i - 1];
        waitTime[i] = serviceTime[i] - arrivalTime[i];
        if (waitTime[i] < 0) {
            wasted = Math.abs(waitTime[i]);
            waitTime[i] = 0;
        }
        serviceTime[i] = serviceTime[i] + wasted;
    }
}

module.exports = { findWaitingTime }