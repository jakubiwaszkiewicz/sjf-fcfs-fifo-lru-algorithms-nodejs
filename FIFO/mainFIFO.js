const fs = require('fs')
const data = JSON.parse(fs.readFileSync("../data/dataPage.txt"))
const capacities = [5, 10, 15]

function FIFOOperations(capacities, data) {
    let totalSeriesPageFaults = 0
    let results = []
    for (let i = 0; i < capacities.length; i++) {

        let totalPagesFaults = 0
        let capacity = capacities[i];
        for (let j = 0; j < data.length; j++) {

            let pages = data[j]
            let s = new Set();
            let indexes = []
            let pageFaults = 0
            for (let i = 0; i < pages.length; i++) {
                if (s.size < capacity) {
                    if (!s.has(pages[i])) {
                        s.add(pages[i])
                        pageFaults++
                        indexes.push(pages[i])
                    }
                } else {
                    if (!s.has(pages[i])) {
                        let val = indexes[0];
                        indexes.shift();
                        s.delete(val);
                        s.add(pages[i]);
                        indexes.push(pages[i]);
                        pageFaults++;
                    }
                }
            }
            totalSeriesPageFaults += pageFaults
        }
        results.push(totalSeriesPageFaults / data.length)

    }
    console.log(results)
}
FIFOOperations(capacities, data)