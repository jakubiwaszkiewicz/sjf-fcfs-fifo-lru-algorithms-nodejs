function FCSOperations () {
    // Importowanie modułu node.js'a 'fs' potrzebnych do operacji na plikach
    let fs = require("fs")
    // Zamiana typu danych i wczytanie danych z pliku dataProc.txt
    const data = JSON.parse(fs.readFileSync("../data/dataProc.txt", "utf-8"))
    // typeof data ~ array
    // importowanie wcześniej wyeksportowanych funkcji dla utrzymania czytelniejszego kodu
    const { findTurnAroundTime } = require('./findTurnAroundTime.js')
    const { findWaitingTime } = require('./findWaitingTime.js')
    // Deklaracja zmiennych potrzebnych do otrzymania sumy wartości testowych
    let dataTotalTurnAroundTimes = 0, dataTotalWaitingTime = 0
    let countOfSeries = data.length
    // Pętla potrzebna do iteracji
    for (let i = 0; i < countOfSeries; i++) {
        // Deklaracja zmiennych do funkcji poszukiwania wartości czasu oczekiwania i czasu cyklu
        const series = data[i]
        const processes = series.map((element) => element[0])
        const burstTime = series.map((element) => element[1])
        const countOfProcesses = burstTime.length;
        const arrivalTime = series.map((element) => element[2])
        // Sortowanie czasy przybycia procesów
        arrivalTime.join()
        arrivalTime.sort((a, b) => a - b)
        // Deklaracja zmiennych do przetrzymywania wartości jednej serii, czyli 100 procesów
        let seriesTotalWaitingTime = 0, seriesTotalTurnAroundTime = 0;
            function findAverageTime(processes, countOfProcesses, burstTime, arrivalTime) {
                // Deklarowanie tablic do przetrzymywania czasu oczekiwania i czasu cyklu
                let waitTime = Array.from({length: countOfProcesses}, () => 0.0);
                let turnAroundTime = Array.from({length: countOfProcesses}, () => 0.0);
                // Funkcja obliczająca czas oczekiwania
                findWaitingTime(countOfProcesses, burstTime, waitTime, arrivalTime);
                // Funkcja obliczająca czas cyklu
                // Wartości zminnych waitTime i turnAroundTime są przetrzymywane w tablicy aby można było zrobić tabele
                // aby umożliwić zrobienie tabeli z przetrzymywanych wartości
                findTurnAroundTime(countOfProcesses, burstTime, waitTime, turnAroundTime);
                // Pętla potrzebna do zsumowania wartości czasu oczekiwania i czasu cyklu
                for (let i = 0; i < countOfProcesses; i++) {
                    seriesTotalWaitingTime += waitTime[i];
                    seriesTotalTurnAroundTime += turnAroundTime[i];
                }
                return [seriesTotalWaitingTime / countOfProcesses, seriesTotalTurnAroundTime / countOfProcesses]
            }
        // Przydzielanie wartości średnich serii do całkowitych wartości czasu oczekiwaniai czasu cyklu
        // metodą destrukturyzacji, obiektów
        const [seriesAverageWaitingTime, seriesAverageTurnAroundTime] = findAverageTime(processes, countOfProcesses, burstTime, arrivalTime);
        dataTotalWaitingTime += seriesAverageWaitingTime
        dataTotalTurnAroundTimes += seriesAverageTurnAroundTime

    }
    let [dataAverageWaitingTime, dataAverageTurnAroundTime] = [dataTotalWaitingTime / countOfSeries, dataTotalTurnAroundTimes / countOfSeries]
    // Wyświetlanie w konsoli całkowitych wartości średnich czasu oczekiwania i czasu cyklu dla całych podanych danych
    console.log(`Average waiting time = ${dataAverageWaitingTime.toFixed(2)}`);
    console.log(`Average turn around time = ${dataAverageTurnAroundTime.toFixed(2)}`);
}
// wywołanie funkcji
FCSOperations ()