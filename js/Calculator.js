class Calculator {

    Complex(re, im) {
        return new Complex(re, im);
    }

    Vector(values) {
        return new Vector(values);
    }

    Matrix(values) {
        return new Matrix(values);
    }

    getEntity(str) {
        if (str) {
            if (!isNaN(str - 0)) {
                return str - 0;
            }

            if (str[0] == '(') {
                return this.getVector(str);
            }

            if (str[0] == '[') {
                return this.getMatrix(str);
            }

            if (str.includes('i')) {
                return this.getComplex(str);
            }
            return null;
        }
        return null;
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
            } else {
                return new Complex(0, arr[1] - 0);
            }
        }
    }

    getVector(str) {
        let arr = str.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').split(',');

        if (str.includes('i') || str.includes('[')) {
            for (let i = 0; i < 3; i++) {
                arr[i] = this.getEntity(arr[i]);
            }
        }
        arr[0] = arr[0];
        arr[1] = arr[1];
        arr[2] = arr[2];
        return new Vector(arr);
    }

    getMatrix(str) {
        let arr = str.replaceAll(' ', '').replaceAll('[', '').replaceAll(']', '').replaceAll('\n', '').split('|');

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split(';');
        }

        if (str.includes('i') || str.includes('(')) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[0].length; j++) {
                    arr[i][j] = this.getEntity(arr[i][j]);
                }
            }
        }
        return new Matrix(arr);
    }

    get(elem) {
        if (elem instanceof Matrix) return new MatrixCalculator(this.get(elem.values[0][0]));
        if (elem instanceof Vector) return new VectorCalculator(this.get(elem.values[0]));
        if (elem instanceof Complex) return new ComplexCalculator;
        return new RealCalculator;
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

    zero(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex': return this.get(this.Complex()).zero();
            case 'Vector': return this.get(this.Vector()).zero(elem.values.length);
            case 'Matrix': return this.get(this.Matrix()).zero(elem.values.length);
            default: return this.get().zero();
        }
    }

    one(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex': return this.get(this.Complex()).one();
            case 'Vector': return this.get(this.Vector()).one(elem.values.length);
            case 'Matrix': return this.get(this.Matrix()).one(elem.values.length);
            default: return this.get().one();
        }
    }
}