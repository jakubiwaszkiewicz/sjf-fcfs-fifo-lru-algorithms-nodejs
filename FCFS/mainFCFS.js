fs = require("fs")
const data = JSON.parse(fs.readFileSync("../data/data.txt", "utf-8"))
const { findTurnAroundTime } = require('./findTurnAroundTime.js')
const { findWaitingTime } = require('./findWaitingTime.js')

let dataTotalTurnAroundTimes = 0, dataTotalWaitingTime = 0
let countOfSeries = data.length


function FCSOperations (dataTotalTurnAroundTimes, dataTotalWaitingTime, countOfSeries) {
    for (let i = 0; i < countOfSeries; i++) {

        const series = data[i]
        const processes = series.map((element) => element[0])
        const countOfProcesses = processes.length;

        const arrivalTime = series.map((element) => element[1])
        arrivalTime.join()
        arrivalTime.sort((a, b) => a - b)

        const burstTime = series.map((element) => element[2])
        burstTime.join()
        burstTime.sort((a, b) => a - b)

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
    console.log(`Average waiting time = ${dataTotalWaitingTime / countOfSeries}`);
    console.log(`Average turn around time = ${dataTotalTurnAroundTimes / countOfSeries}`);
}

FCSOperations (dataTotalTurnAroundTimes, dataTotalWaitingTime, countOfSeries)