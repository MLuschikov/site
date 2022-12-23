class VectorCalculator{

    constructor(calc = new ComplexCalculator) {
        this.calc = calc;
    }

    add(a, b) {
        return new Vector(a.values.map((elem, i) => this.calc.add(elem, b.values[i])));
    }

    sub(a, b) {
        return new Vector(a.values.map((elem, i) => this.calc.sub(elem, b.values[i])));
    }

    mult(a, b) {
        const { mult, sub } = this.calc;
        return new Vector([
            sub(mult(a.values[1], b.values[2]), mult(a.values[2], b.values[1])),
            sub(mult(a.values[2], b.values[0]), mult(a.values[0], b.values[2])),
            sub(mult(a.values[0], b.values[1]), mult(a.values[1], b.values[0]))
        ]);
    }

    div() {
        return null;
    }

    prod(p, a) {
        return new Vector(a.values.map(elem => this.calc.prod(p, elem)));
    }

    pow(a, p) {
        let c = this.one(3);
        for (let i = 0; i < p; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.calc.one());
        }
        return new Vector(values);
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.calc.zero());
        }
        return new Vector(values);
    }

    module() {
        let m = 0;
        this.values.forEach(elem => m += elem ** 2);
        return Math.sqrt(m);
    }
}