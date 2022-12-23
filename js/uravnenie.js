// 0 = a*x + b
function line(a, b) {
    if (a === 0 && b === 0) {
        return [];
    }
    if (a === 0) {
        return null;
    }
    return [-b / a];
}

// 0 = a * x^2 + b * x + c
function square(a, b, c) {
    var D = b * b - 4 * a * c;
    if (D < 0) {
        return null;
    }
    if (D === 0) {
        return [-b / (2 * a)];
    }
    return [
        (-b - Math.sqrt(D)) / (2 * a),
        (-b + Math.sqrt(D)) / (2 * a)
    ];
}

function cuberoot(x) {
    var y = Math.pow(Math.abs(x), 1 / 3);
    return x < 0 ? -y : y;
}

function solveCubic(a, b, c, d) {
    if (Math.abs(a) < 1e-8) { // Quadratic case, ax^2+bx+c=0
        a = b; b = c; c = d;
        if (Math.abs(a) < 1e-8) { // Linear case, ax+b=0
            a = b; b = c;
            if (Math.abs(a) < 1e-8) // Degenerate case
                return [];
            return [-b / a];
        }

        var D = b * b - 4 * a * c;
        if (Math.abs(D) < 1e-8)
            return [-b / (2 * a)];
        else if (D > 0)
            return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)];
        return [];
    }

    // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
    var p = (3 * a * c - b * b) / (3 * a * a);
    var q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    var roots;

    if (Math.abs(p) < 1e-8) { // p = 0 -> t^3 = -q -> t = -q^1/3
        roots = [cuberoot(-q)];
    } else if (Math.abs(q) < 1e-8) { // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
        roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
    } else {
        var D = q * q / 4 + p * p * p / 27;
        if (Math.abs(D) < 1e-8) {       // D = 0 -> two roots
            roots = [-1.5 * q / p, 3 * q / p];
        } else if (D > 0) {             // Only one real root
            var u = cuberoot(-q / 2 - Math.sqrt(D));
            roots = [u - p / (3 * u)];
        } else {                        // D < 0, three roots, but needs to use complex numbers/trigonometric solution
            var u = 2 * Math.sqrt(-p / 3);
            var t = Math.acos(3 * q / p / u) / 3;  // D < 0 implies p < 0 and acos argument in [-1..1]
            var k = 2 * Math.PI / 3;
            roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)];
        }
    }

    // Convert back from depressed cubic
    for (var i = 0; i < roots.length; i++)
        roots[i] -= b / (3 * a);

    return roots;
}

function quad(a, b, c, d, e) {

    FormulaUtil.calcFourFormulaZero = function (a, b, c, d, e) {

        // Коэффициент члена высшего порядка равен 0, что решается уравнением нижнего порядка
        if (FormulaUtil.near0(a)) {
            return FormulaUtil.calcCubicFormulaZero(b, c, d, e);
        }

        // Проверка показала, что метод Ferrari не может обрабатывать некоторые особые случаи. Вероятность ошибки выше, когда m = 0, но необходимый закон не может быть найден. Поэтому в некоторых случаях, когда число раз может быть непосредственно уменьшено простым методом, Добавить специальную обработку
        // Кроме того, преимущество обработки в особом случае заключается в том, что объем вычислений невелик, что может снизить потерю точности в середине вычислений.

        // В случае топора ^ 4 + e = 0 просто откройте квадрат
        if (FormulaUtil.near0(b) && FormulaUtil.near0(c) && FormulaUtil.near0(d)) {
            return new ComplexNum(- e / a).getRoot(4);
        }

        // ax ^ 4 + bx ^ 3 = 0, постоянный член, первичный член и вторичный член - все 0, затем три корня - 0, а затем его можно уменьшить непосредственно до 1 раза.
        if (FormulaUtil.near0(c) == 0 && FormulaUtil.near0(d) && FormulaUtil.near0(e)) {
            var lineRoots = calcLineFormulaZero(a, b);
            lineRoots.unshift(new ComplexNum());
            lineRoots.unshift(new ComplexNum());
            lineRoots.unshift(new ComplexNum());
            return lineRoots;
        }

        // ax ^ 4 + bx ^ 3 + cx ^ 2 = 0, постоянное слагаемое и слагаемое первого порядка равны 0, затем два корня равны 0, а затем его можно непосредственно уменьшить в 2 раза.
        if (FormulaUtil.near0(d) && FormulaUtil.near0(e)) {
            var squareRoots = FormulaUtil.calcSquareFormulaZero(a, b, c);
            squareRoots.unshift(new ComplexNum());
            squareRoots.unshift(new ComplexNum());
            return squareRoots;
        }

        // ax ^ 4 + bx ^ 3 + cx ^ 2 + dx = 0, постоянный член равен 0, есть корень из 0, а затем его можно уменьшить непосредственно в 3 раза.
        if (FormulaUtil.near0(e)) {
            var cubicRoots = FormulaUtil.calcCubicFormulaZero(a, b, c, d);
            cubicRoots.unshift(new ComplexNum());
            return cubicRoots;
        }

        // ax ^ 4 + cx ^ 2 + e = 0, первое и третье слагаемые равны 0. Это биквадратичное уравнение. Используйте метод подстановки, чтобы уменьшить y = x ^ 2 в два раза.
        if (FormulaUtil.near0(b) && FormulaUtil.near0(d)) {
            var twoSquareRoots = FormulaUtil.calcSquareFormulaZero(a, c, e);
            var fourRoots = twoSquareRoots[0].squareRoot().concat(twoSquareRoots[1].squareRoot());
            return fourRoots;
        }

        var P = (c * c + 12 * a * e - 3 * b * d) / 9;
        var Q = (27 * a * d * d + 2 * c * c * c + 27 * b * b * e - 72 * a * c * e - 9 * b * c * d) / 54;
        var D = new ComplexNum(Q * Q - P * P * P).squareRoot()[0];

        var u1 = new ComplexNum(Q).add(D).cubicRoot()[0];
        var u2 = new ComplexNum(Q).subtract(D).cubicRoot()[0];

        var u = u1.length > u2.length ? u1 : u2;

        var v = (u.real == 0 && u.image == 0) ? new ComplexNum() : (new ComplexNum(P).divide(u));

        var omegas = [ComplexConsts.OMEGA_ZERO, ComplexConsts.OMEGA, ComplexConsts.OMEGA_SQUARE, ComplexConsts.OMEGA_CUBIC];

        var currentMLength = 0;
        var maxM;
        var currentOmegaObj;
        // Рассчитать все m, чтобы получить максимальное значение
        for (var k = 0; k < 3; k++) {
            var m = new ComplexNum(b * b - 8 / 3 * a * c);
            var omegaObj = u.clone();//omegas[k].multiply(u);
            omegaObj = omegaObj.add(v);
            omegaObj = omegaObj.multiplyNumber(4 * a);
            m = m.add(omegaObj);
            m = m.squareRoot()[0];
            if (m.length >= currentMLength) {
                currentOmegaObj = omegaObj;
                currentMLength = m.length;
                maxM = m;
            }
        }

        m = maxM;
        omegaObj = currentOmegaObj;

        var S = new ComplexNum(2 * b * b - 16 / 3 * a * c);
        S = S.subtract(omegaObj);

        var T;
        if (!FormulaUtil.near0(m.real) || !FormulaUtil.near0(m.image)) {
            T = new ComplexNum(8 * a * b * c - 16 * a * a * d - 2 * b * b * b);
            T = T.divide(m);
        } else {
            T = new ComplexNum();
        }

        var results = [];

        for (var n = 1; n <= 4; n++) {
            var value = new ComplexNum();
            // - 1 в степени [n / 2], [n / 2] представляет наибольшее целое число меньше, чем n / 2
            var minus1Pow0_5 = n > 2 ? -1 : 1;
            value = value.subtractNumber(b);
            value = value.add((new ComplexNum(minus1Pow0_5, 0).multiply(m)));
            value = value.add(S.add(new ComplexNum(minus1Pow0_5, 0).multiply(T)).squareRoot()[0].multiplyNumber(n % 2 == 0 ? -1 : 1));
            value = value.divideNumber(4 * a);
            results.push(value);
        }

        return results;
    }
}

function getRoots(a, b, c, d, e) {
    if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d) && !isNaN(e))
        return quad(a, b, c, d, e);
    if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d))
        return solveCubic(a, b, c, d);
    if (!isNaN(a) && !isNaN(b) && !isNaN(c))
        return square(a, b, c);
    if (!isNaN(a) && !isNaN(b))
        return line(a, b);
    return null;
}