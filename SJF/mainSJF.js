fs = require("fs")
const data = JSON.parse(fs.readFileSync("../data/data.txt", "utf-8"))
const series = data[0]

let processes = series.map((element) => element[0])
let countOfProcesses = processes.length;

let arrivalTime = series.map((element) => element[1])
arrivalTime.join()
arrivalTime.sort((a, b) => a - b)

let burstTime = series.map((element) => element[2])
burstTime.join()
burstTime.sort((a, b) => a - b)
console.log(arrivalTime, burstTime, countOfProcesses)

function SJFOperations (arrivalTime, burstTime, countOfProcesses) {


    let temp, value = 0
    let completionTime  = Array.from({length: countOfProcesses}, () => 0)
    let turnAroundTime = Array.from({length: countOfProcesses}, () => 0)
    let waitingTime = Array.from({length: countOfProcesses}, () => 0)

    completionTime[0] = arrivalTime[0] + burstTime[0];
    turnAroundTime[0] = completionTime[0] - arrivalTime[0];
    waitingTime[0] = turnAroundTime[0] - burstTime[0];

    for (let i = 1; i < countOfProcesses; ++i) {
        temp = completionTime[i-1];
        let low = burstTime[i];

        for (let j = i; j < countOfProcesses; j++) {
            if (temp >= arrivalTime[j] && low >= burstTime[j]) {
                low = burstTime[j];
                value = j;
            }
            completionTime[value] = temp + burstTime[value];
            turnAroundTime[value] = completionTime[value] - arrivalTime[value];
            waitingTime[value] = turnAroundTime[value] - burstTime[value];
        }


    }
    let totalTurnAroundTime = 0
    let totalWaitingTime = 0
    turnAroundTime.map((turnAroundTime) => {totalTurnAroundTime += turnAroundTime})
    waitingTime.map((waitingTime) => {totalWaitingTime += waitingTime})
    console.log(`Average turn around time = ${totalTurnAroundTime/countOfProcesses}`)
    console.log(`Average waiting = ${totalWaitingTime/countOfProcesses}`)
}

SJFOperations (arrivalTime, burstTime, countOfProcesses)