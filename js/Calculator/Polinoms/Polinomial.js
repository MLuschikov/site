class Polynomial {
    constructor(poly = []) {
        this.poly = poly;
        this.poly.sort((a, b) => b.power - a.power);
    }

    getValue(x) {
        const calc = new Calculator;
        let length = 0;
        if (x instanceof Vector) {
            length = x.length;
        }
        if (x instanceof Matrix) {
            length = x[0].length;
        }
        return this.poly.reduce((s, elem) => calc.add(s, calc.prod(elem.value, calc.pow(x, elem.power))), calc.zero(length));
    }

    toString() {
        let str = this.poly[0].toString();
        for (let i = 1; i < this.poly.length; i++) {
            str += (this.poly[i].value > 0) ? '+' + this.poly[i].toString() : this.poly[i].toString();
        }
        return str;
    }
}