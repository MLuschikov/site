class MatrixCalculator{

    constructor(calcComp = new ComplexCalculator) {
        this.calcComp = calcComp;
    }

    add(a, b) {
        return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => this.calcComp.add(elem, b.values[i][j]))));
    }

    sub(a, b) {
        return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => this.calcComp.sub(elem, b.values[i][j]))));
    }

    mult(a, b) {
        const values = [];
        for (let i = 0; i < a.values.length; i++) {
            values.push([]);
            for (let j = 0; j < a.values[i].length; j++) {
                let s = this.calcComp.zero();
                for (let k = 0; k < a.values[i].length; k++) {
                    s = this.calcComp.add(s, this.calcComp.mult(a.values[i][k], b.values[k][j]));
                }
                values[i][j] = s;
            }
        }
        return new Matrix(values);
    }

    div() {
        return null;
    }

    prod(p, a) {
        return new Matrix(a.values.map((arr) => arr.map((elem) => this.calcComp.prod(p, elem))));
    }

    pow(a, n) {
        let c = this.one(a.values.length);
        for (let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calcComp[i === j ? 'one' : 'zero']();
            }
        }
        return new Matrix(values);
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calcComp.zero();
            }
        }
        return new Matrix(values);
    }

    module() {
        const { val } = this.values;
        return (val.length === 1) ?
            val[0] :
            (val.length === 2) ?
                val[0][0] * val[1][1] - val[1][0] * val[0][1] :
                (val.length === 3) ?
                    val[0][0] * (val[1][1] * val[2][2] - val[2][1] * val[1][2])
                    - val[0][1] * (val[1][0] * val[2][2] - val[2][0] * val[1][2])
                    + val[0][2] * (val[1][0] * val[2][1] - val[2][0] * val[1][1])
                    : null;
    }
}