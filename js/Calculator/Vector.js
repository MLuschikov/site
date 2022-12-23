class Vector {
    constructor(values = []) {
        this.values = [];
        values.forEach(elem => this.values.push(elem));
    }

    toString() {
        return `(${this.values.map(val => val.toString()).join(', ')})`;
    }
}