const dataGeneratorForProcAlg = () => {
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

const dataGeneratorForPageAlg = () => {

}


dataGeneratorForPageAlg()
dataGeneratorForProcAlg()

// console.log(JSON.parse(fs.readFileSync("./data/data.txt", "utf8")));