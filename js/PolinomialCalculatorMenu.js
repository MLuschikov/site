function PolynomialCalculatorMenu() {

    function operandHandler(event) {
        const input1 = document.getElementById('poly-input-1');
        const input2 = document.getElementById('poly-input-2');
        const calc = new PolynomialCalculator;
        const a = calc.getPolynomial(input1.value);
        const b = calc.getPolynomial(input2.value);
        const operand = event.target.dataset.operand;
        input1.value = calc[operand](a, b).toString();
        input2.value = '';
        console.log(calc[operand](a, b), 'a');
        console.log(calc[operand](a, b), 'b');
        console.log(calc[operand](a, b), 'c');
    }

    function getPointValue() {
        const input1 = document.getElementById('poly-input-1');
        const input2 = document.getElementById('poly-point');

        const pointCalc = new Calculator;
        const calc = new PolynomialCalculator;
        const a = calc.getPolynomial(input1.value);
        const x = pointCalc.getEntity(input2.value);

        console.log(x);

        input2.value = a.getValue(x).toString();
    }

    document.querySelectorAll('.polyOperand').forEach(button => button.addEventListener('click', operandHandler));
    document.getElementById('polyPointButton').addEventListener('click', getPointValue);
}
//6*x**2+3*x