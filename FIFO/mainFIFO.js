/*
class Queue {
    constructor(...elements) {
        // Initializing the queue with given arguments
        this.elements = [...elements];
    }
    // Proxying the push/shift methods
    push(...args) {
        return this.elements.push(...args);
    }
    shift(...args) {
        return this.elements.shift(...args);
    }
    // Add some length utility methods
    get length() {
        return this.elements.length;
    }
    set length(length) {
        return this.elements.length = length;
    }
}

// Usage
const q = new Queue(0,1);

q.push(2);

console.log(q.length); // 3

while(q.length)
    console.log(q.shift()); // 0, 1, 2*/
