class VectorCalculator extends RealCalculator {

    constructor(calc = new RealCalculator) {
        super();
        this.calc = calc;
    }

    add(a, b) {
        return new Vector(a.values.map((elem, i) => elem + b.values[i]));
    }

    sub(a, b) {
        return new Vector(a.values.map((elem, i) => elem - b.values[i]));
    }

    mult(a, b) {
        return new Vector([
            a.values[1] * b.values[2] - a.values[2] * b.values[1],
            a.values[2] * b.values[0] - a.values[0] * b.values[2],
            a.values[0] * b.values[1] - a.values[1] * b.values[0]
        ]);
    }

    div() {
        return null;
    }

    prod(p, a) {
        return new Vector(a.values.map(elem => elem * p));
    }

    pow(a, p) {
        let c = this.one(3);
        for (let i = 0; i < p; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    one(lenght) {
        const values = [];
        for (let i = 0; i < lenght; i++) {
            values.push(super.prod(1 / Math.sqrt(length), super.one()));
        }
        return new Vector(values);
    }

    zero() {
        const values = [];
        for (let i = 0; i < lenght; i++) {
            values.push(super.zero());
        }
        return new Vector(values);
    }

    module() {
        let m = 0;
        this.values.forEach(elem => m += elem ** 2);
        return Math.sqrt(m);
    }
}