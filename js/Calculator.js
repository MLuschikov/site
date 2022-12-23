class Calculator {

    complex(re, im) {
        return new Complex(re, im);
    }

    vector(values) {
        return new Vector(values);
    }

    matrix(values) {
        return new Matrix(values);
    }

    getEntity(str) {
        str = str.replaceAll(' ', '').replaceAll('\n', '');
        if (str[0] === '(') {
            return this.getVector(str);
        }
        if (str[0] === '[') {
            return this.getMatrix(str);
        }
        if (str.includes('i')) return this.getComplex(str);
        return this.getComplex(str);
    }

    getComplex(str) {
        let arr = str.replaceAll(' ', '').split('i');
        if (arr.length === 2) {
            if (arr[0]) {
                const ch = arr[0].substr(arr[0].length - 1);
                arr[0] = arr[0].slice(0, -1);
                arr[1] = !arr[1] ? 1 : arr[1];
                if (ch === '-') {
                    arr[1] = ch + arr[1];
                }
                return new Complex(arr[0] - 0, arr[1] - 0);
            }
            return new Complex(0, arr[1] - 0);
        }
        return new Complex(str - 0);
    }

    getVector(str) {
        let arr = str.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').split(',');

        if (str.includes('[')) {
            for (let i = 0; i < 3; i++) {
                if (arr[i].includes('[')) {
                    arr[i] = this.getEntity(arr[i]);
                }
            }
        }
        else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] instanceof Matrix) {
                    arr[i] = arr[i];
                }
                else {
                    arr[i] = this.getComplex(arr[i]);
                }
            }
        }

        return new Vector(arr);
    }

    getMatrix(str) {
        let arr = str.replaceAll(' ', '').replaceAll('[', '').replaceAll(']', '').replaceAll('\n', '').split('|');

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split(';');
        }

        if (str.includes('(')) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[0].length; j++) {
                    if (arr[i][j].includes('(')) {
                        arr[i][j] = this.getEntity(arr[i][j]);
                    }
                }
            }
        }

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if (arr[i][j] instanceof Vector) {
                    arr[i][j] = arr[i][j];
                }
                else {
                    arr[i][j] = this.getComplex(arr[i][j]);
                }
            }
        }

        console.log(arr);

        return new Matrix(arr);
    }

    get(elem) {
        if (elem instanceof Matrix) return new MatrixCalculator(this.get(elem.values[0][0]));
        if (elem instanceof Vector) return new VectorCalculator(this.get(elem.values[0]));
        if (elem instanceof Complex) return new ComplexCalculator;
        return new ComplexCalculator;
    }

    add(a, b) {
        return this.get(a).add(a, b);
    }
    sub(a, b) {
        return this.get(a).sub(a, b);
    }
    mult(a, b) {
        return this.get(a).mult(a, b);
    }
    div(a, b) {
        return this.get(a).div(a, b);
    }
    prod(p, a) {
        return this.get(a).prod(p, a);
    }
    pow(a, p) {
        return this.get(a).pow(a, p);
    }

    zero(elem) {
        const type = elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex': return this.get(this.complex()).zero();
            case 'Vector': return this.get(this.vector()).zero(elem.values.length);
            case 'Matrix': return this.get(this.matrix()).zero(elem.values.length);
            default: return this.get().zero();
        }
    }

    one(elem) {
        const type = elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex': return this.get(this.complex()).one();
            case 'Vector': return this.get(this.vector()).one(elem.values.length);
            case 'Matrix': return this.get(this.matrix()).one(elem.values.length);
            default: return this.get().one();
        }
    }
}