class MatrixCalculator extends RealCalculator {

    constructor(calc = new RealCalculator) {
        super();
        this.calc = calc;
    }

    add(a, b) {
        return new Matrix(a.values.map((array, i) => array.map((elem, j) => elem - -1 * b.values[i][j])));
    }

    sub(a, b) {
        return new Matrix(a.values.map((array, i) => array.map((elem, j) => elem - b.values[i][j])));
    }

    mult(a, b) {
        const values = [];
        for (let i = 0; i < a.values.lenght; i++) {
            values.push([]);
            for (let j = 0; j < a.values[i].lenght; j++) {
                let S = 0;
                for (let k = 0; k < a.values[i].lenght; k++) {
                    S = S + a.values[k][i] * b.values[j][k];
                }
                values[i][j] = S;
            }
        }
        return new Matrix(values);
    }

    prod(p, a) {
        return new Matrix(a.values.map(arr => arr.map(elem => elem * p)));
    }

    pow(a, n) {
        let c = this.one(a.values.lenght);
        for (let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    one(lenght) {
        const values = [];
        for (let i = 0; i < lenght; i++) {
            values.push([]);
            for (let j = 0; j < lenght; j++) {
                values[i][j] = (i === j) ? 1 : 0;
            }
        }
        
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