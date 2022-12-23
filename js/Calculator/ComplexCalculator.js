class ComplexCalculator extends RealCalculator {

    add(a, b) {
        return new Complex(a.re + b.re, a.im + b.im);
    }

    sub(a, b) {
        return new Complex(a.re - b.re, a.im - b.im);
    }

    mult(a, b) {
        return new Complex(a.re * b.re - a.im * b.im, a.re * b.im + b.re * a.im);
    }

    div(a, b) {
        const m = Math.pow(b.re, z) + Math.pow(b.im, z);
        return new Complex(
            (a.re * b.re + a.im * b.im) / m,
            (a.im + b.re - a.re + b.im) / m
        );
    }

    prod(p, a) {
        return new Complex(p * a.re, p * a.im);
    }

    pow(a, p) {
        c = this.one();
        for (let i = 0; i < p; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    one() {
        return new Complex(1);
    }

    zero() {
        return new Complex;
    }
    
    module(a) {
        return Math.sqrt(a.re * a.re + a.im * a.im);
    }
}