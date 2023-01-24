const dataGeneratorProcAlg = () => {
    let data = []
    for (let i = 1; i <= 100; i++) {
        let unsortedSeries = []
        for (let j = 1; j <= 100; j++) {
            let element = []
            element.push(j)
            element.push(Math.floor(Math.random() * 20 + 1)) // seconds how long process will be executed (Burst time)
            element.push(Math.floor(Math.random() * 100)) // second when process arrived (Arrival time)
            unsortedSeries.push(element)
        }
        data.push(unsortedSeries)
    }
    const fs = require('fs')
    fs.writeFileSync("./data/dataProc.txt", JSON.stringify(data));
    if (JSON.parse(fs.readFileSync("./data/dataProc.txt", "utf8"))) {
        console.log("New data for processors algorithms has been generated")
    }
}

const dataGeneratorPageAlg = () => {
    const page = 20
    let data = []
    for (let i = 0; i < 100; i++) {
        let series = []
        for (let i = 0; i < 100; i++) {
            let singleData = Math.floor(Math.random() * page)
            series.push(singleData)
        }
        data.push(series)
    }
    const fs = require('fs')
    fs.writeFileSync('./data/dataPage.txt', JSON.stringify(data))
    console.log(JSON.parse(fs.readFileSync('./data/dataPage.txt')))
}
dataGeneratorPageAlg()
dataGeneratorPageAlg()

// console.log(JSON.parse(fs.readFileSync("./data/data.txt", "utf8")));