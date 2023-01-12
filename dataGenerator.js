let data = []
for (let i = 1; i <= 100; i++) {
    let unsortedSeries = []
    for (let j = 1; j <= 100; j++) {

        let element = []
        element.push(j)
        element.push(Math.floor(Math.random() * 20 + 1)) // seconds how long process will be executed
        element.push(Math.floor(Math.random() * 200)) // second when process arrived
        unsortedSeries.push(element)
    }
    data.push(unsortedSeries)
}

const fs = require('fs')

fs.writeFileSync("./data/data.txt", JSON.stringify(data));

if (JSON.parse(fs.readFileSync("./data/data.txt", "utf8"))) {
    console.log("done")
}
// console.log(JSON.parse(fs.readFileSync("./data/data.txt", "utf8")));