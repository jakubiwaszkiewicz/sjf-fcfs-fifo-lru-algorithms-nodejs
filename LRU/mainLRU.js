function LRUOperations() {
    // Importowanie modułu node.js'a 'fs' potrzebnych do operacji na plikach
    const fs = require('fs')
    const data = JSON.parse(fs.readFileSync("../data/dataPage.txt"))
    const capacities = [5, 10, 15]

    let results = []

    for (let i = 0; i < capacities.length; i++) {
        let totalPagesFaults = 0
        let capacity = capacities[i];

        for (let j = 0; j < data.length; j++) {
            let pages = data[j];
            let memory = new Set();
            let indexes = new Map();
            let pageFaults = 0;

            for (let k = 0; k < pages.length; k++) {
                if (memory.size < capacity) {
                    if (!memory.has(pages[k])) {
                        memory.add(pages[k]);
                        pageFaults++;
                    }
                    indexes.set(pages[k], k);
                } else {
                    if (!memory.has(pages[k])) {
                        let max = Number.MAX_VALUE, min = Number.MIN_VALUE;
                        for (let itr of memory.values()) {
                            let temp = itr;
                            if (indexes.get(temp) < max) {
                                max = indexes.get(temp);
                                min = temp;
                            }
                        }
                        memory.delete(min);
                        indexes.delete(min);
                        memory.add(pages[k]);
                        pageFaults++;
                    }
                    indexes.set(pages[k], k);
                }
            }
            totalPagesFaults += pageFaults
        }
        let averageOfTotalPagesFault = totalPagesFaults / data.length
        results.push(averageOfTotalPagesFault)
    }
    console.log(`Average page faults for capacity equal ${capacities[0]}: ${results[0]}`)
    console.log(`Average page faults for capacity equal ${capacities[1]}: ${results[1]}`)
    console.log(`Average page faults for capacity equal ${capacities[2]}: ${results[2]}`)
}
LRUOperations()