function findTurnAroundTime(processes, countOfProcesses, burstTime, waitTime, turnAroundTime) {
    for (let i = 0; i < countOfProcesses; i++)
        turnAroundTime[i] = burstTime[i] + waitTime[i];
}

module.exports = { findTurnAroundTime }