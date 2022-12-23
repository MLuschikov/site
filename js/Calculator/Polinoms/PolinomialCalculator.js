class PolynomialCalculator {

    polynomial(members) {
        return new Polynomial(members);
    }

    getPolynomial(str) {
        str = str.replaceAll(' ', '');
        const arr = [];
        let start = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i + 1] === '+' || str[i + 1] === '-') {
                arr.push(str.substr(start, i + 1 - start));
                start = i + 1;
            }
        }
        arr.push(str.substr(start, str.length - start));
        const members = [];
        arr.forEach(elem => members.push(this.getMember(elem)));
        return this.polynomial(members);
    }

    getMember(str) {
        const arr = str.split('x');
        if (arr.length === 1) {
            return new Member(arr[0] - 0);
        }
        arr[0] = arr[0].replace('*', '');
        arr[1] = arr[1].replace('^', '').replace('**', '');
        if (arr[0] == '') arr[0] = 1;
        return arr[1] ? new Member(arr[0] - 0, arr[1] - 0) : new Member(arr[0] - 0, 1);
    }

    add(a, b) {
        const calc = new Calculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.add(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        });
        return this.polynomial(members);
    }

    sub(a, b) {
        const calc = new Calculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.sub(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(-elemB.value, elemB.power));
            }
        });
        return this.polynomial(members);
    }

    mult(a, b) {
        const calc = new Calculator;
        let polynomial = this.polynomial();
        a.poly.forEach(elemA => {
            const members = [];
            b.poly.forEach(elemB => {
                members.push(new Member(calc.mult(elemA.value, elemB.value), elemA.power + elemB.power));
            });
            polynomial = this.add(polynomial, this.polynomial(members));
        });
        return polynomial;
    }
}