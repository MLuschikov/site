class Complex {
    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }

    toString() {
        if (this.im === 0) {
            return this.re;
        } if (this.re) {
            return (this.im > 0) ? `${this.re} + i${this.im}` : `${this.re} - i${(-this.im)}`;
        }
        return (this.im > 0) ? `i${this.im}` : `-i${(-this.im)}`;
    }
}