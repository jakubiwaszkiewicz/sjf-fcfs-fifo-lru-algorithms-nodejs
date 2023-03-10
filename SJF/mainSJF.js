function SJFOperations () {
    // Importowanie modułu node.js'a 'fs' potrzebnych do operacji na plikach
    let fs = require("fs")
    const data = JSON.parse(fs.readFileSync("../data/dataProc.txt", "utf-8"))
    const countOfSeries = data.length
    let dataTotalTurnAroundTimes = 0, dataTotalWaitingTime = 0
    for (let k = 0; k < countOfSeries; k++) {

        let series = data[k]

        let processes = series.map((element) => element[0])
        let countOfProcesses = processes.length;

        let burstTime = series.map((element) => element[1])

        let arrivalTime = series.map((element) => element[2])
        arrivalTime.join()
        arrivalTime.sort((a, b) => a - b)

        let completionTime = Array.from({length: countOfProcesses}, () => 0)
        let turnAroundTime = Array.from({length: countOfProcesses}, () => 0)
        let waitingTime = Array.from({length: countOfProcesses}, () => 0)
        completionTime[0] = arrivalTime[0] + burstTime[0];
        turnAroundTime[0] = completionTime[0] - arrivalTime[0];
        waitingTime[0] = turnAroundTime[0] - burstTime[0];
        for (let i = 1; i < countOfProcesses; ++i) {
            let low = burstTime[i];
            for (let j = i; j < countOfProcesses; j++) {
                if (completionTime[i-1] >= arrivalTime[j] && low >= burstTime[j]) {
                    low = burstTime[j];
                }
                completionTime[j] = completionTime[i-1] + burstTime[j];
                turnAroundTime[j] = completionTime[j] - arrivalTime[j];
                waitingTime[j] = turnAroundTime[j] - burstTime[j];
            }
        }
        let totalTurnAroundTime = 0
        let totalWaitingTime = 0
        turnAroundTime.map((turnAroundTime) => {totalTurnAroundTime += turnAroundTime})
        waitingTime.map((waitingTime) => {totalWaitingTime += waitingTime})
        dataTotalTurnAroundTimes += totalTurnAroundTime/countOfProcesses
        dataTotalWaitingTime += totalWaitingTime/countOfProcesses
    }
    let dataAverageWaitingTime = dataTotalWaitingTime / countOfSeries
    let dataAverageTurnAroundTime = dataTotalTurnAroundTimes / countOfSeries

    console.log(`Average waiting time = ${dataAverageWaitingTime.toFixed(2)}`);
    console.log(`Average turn around time = ${dataAverageTurnAroundTime.toFixed(2)}`);
}

SJFOperations ()