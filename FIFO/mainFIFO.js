function FIFOOperations() {
    // Importowanie modułu node.js'a 'fs' potrzebnych do operacji na plikach
    const fs = require('fs')
    const data = JSON.parse(fs.readFileSync("../data/dataPage.txt"))
    const capacities = [5, 10, 15]

    let totalSeriesPageFaults = 0
    let results = []
    for (let i = 0; i < capacities.length; i++) {
        let capacity = capacities[i];
        for (let j = 0; j < data.length; j++) {

            let pages = data[j]
            let memory = new Set();
            let indexes = []
            let pageFaults = 0
            for (let i = 0; i < pages.length; i++) {
                if (memory.size < capacity) {
                    if (!memory.has(pages[i])) {
                        memory.add(pages[i])
                        pageFaults++
                        indexes.push(pages[i])
                    }
                } else {
                    if (!memory.has(pages[i])) {
                        indexes.shift();
                        memory.delete(indexes[0]);
                        memory.add(pages[i]);
                        indexes.push(pages[i]);
                        pageFaults++;
                    }
                }
            }
            totalSeriesPageFaults += pageFaults
        }
        results.push(totalSeriesPageFaults / data.length)

    }
    console.log(`Average page faults for capacity equal ${capacities[0]}: ${results[0]}`)
    console.log(`Average page faults for capacity equal ${capacities[1]}: ${results[1]}`)
    console.log(`Average page faults for capacity equal ${capacities[2]}: ${results[2]}`)
}
FIFOOperations()