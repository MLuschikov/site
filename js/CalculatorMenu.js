function CalculatorMenu() {

    function operandHandler(event) {
        const input1 = document.getElementById('calc-value1');
        const input2 = document.getElementById('calc-value2');

        const calc = new Calculator;

        const a = calc.getEntity(input1.value);
        const b = calc.getEntity(input2.value);

        console.log(a, 'pop');

        const operand = event.target.dataset.operand;

        input1.value = calc[operand](a, b).toString();
        input2.value = '';
        console.log(calc[operand](a, b), 'pop');
    }

    document.querySelectorAll('.operand').
        forEach(button => button.addEventListener('click', operandHandler));
}

/*
[(6+i3, 2, 3); 8; 6|
           88; 15; 0|
        50; 90; -6]

(6+i3, 2, 3)
*/