function FCSOperations () {

    let fs = require("fs")
    const data = JSON.parse(fs.readFileSync("../data/dataProc.txt", "utf-8"))
    const { findTurnAroundTime } = require('./findTurnAroundTime.js')
    const { findWaitingTime } = require('./findWaitingTime.js')

    let dataTotalTurnAroundTimes = 0, dataTotalWaitingTime = 0
    let countOfSeries = data.length


    for (let i = 0; i < countOfSeries; i++) {

        const series = data[i]
        const processes = series.map((element) => element[0])
        const countOfProcesses = processes.length;

        const burstTime = series.map((element) => element[1])

        const arrivalTime = series.map((element) => element[2])
        arrivalTime.join()
        arrivalTime.sort((a, b) => a - b)

        let seriesTotalWaitingTime = 0, seriesTotalTurnAroundTime = 0;
            function findAverageTime(processes, countOfProcesses, burstTime, arrivalTime) {
                let waitTime = Array.from({length: countOfProcesses}, () => 0.0);
                let turnAroundTime = Array.from({length: countOfProcesses}, () => 0.0);

                findWaitingTime(processes, countOfProcesses, burstTime, waitTime, arrivalTime);
                findTurnAroundTime(processes, countOfProcesses, burstTime, waitTime, turnAroundTime);

                for (let i = 0; i < countOfProcesses; i++) {
                    seriesTotalWaitingTime += waitTime[i];
                    seriesTotalTurnAroundTime += turnAroundTime[i];
                }
                return [seriesTotalWaitingTime / countOfProcesses, seriesTotalTurnAroundTime / countOfProcesses]

            }
        const [seriesAverageWaitingTime, seriesAverageTurnAroundTime] = findAverageTime(processes, countOfProcesses, burstTime, arrivalTime);
        dataTotalWaitingTime += seriesAverageWaitingTime
        dataTotalTurnAroundTimes += seriesAverageTurnAroundTime
    }
    let dataAverageWaitingTime = dataTotalWaitingTime / countOfSeries
    let dataAverageTurnAroundTime = dataTotalTurnAroundTimes / countOfSeries


    console.log(`Average waiting time = ${dataAverageWaitingTime.toFixed(2)}`);
    console.log(`Average turn around time = ${dataAverageTurnAroundTime.toFixed(2)}`);
}

FCSOperations ()