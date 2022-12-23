class UI {
    constructor({ addFunction, delFunction, inputColor, inputTolh, inputAOfIntegral, inputBOfIntegral }) {
        this.addFunction = addFunction;
        this.delFunction = delFunction;
        this.inputColor = inputColor;
        this.inputTolh = inputTolh;
        this.inputAOfIntegral = inputAOfIntegral;
        this.inputBOfIntegral = inputBOfIntegral;

        this.num = 0;
        const _ = document.getElementById('functionPlus');
        _.addEventListener('click', () => this.addFunctionHandler());

    }
    addFunctionHandler() {
        const inputFunc = document.createElement('input');
        inputFunc.placeholder = 'функция';
        const inputColor = document.createElement('input');
        inputColor.type = "color";
        const tolh = document.createElement('input');
        tolh.placeholder = 'толщина';

        const a = document.createElement('input');
        a.placeholder = 'a';
        a.width = '20';
        const b = document.createElement('input');
        b.placeholder = 'b';
        b.width = '20';

        const br = document.createElement('br');

        inputFunc.dataset.num = this.num;
        inputFunc.addEventListener('keyup', (event) => this.keyupHandler(event));

        inputColor.dataset.num = this.num;
        inputColor.addEventListener('mousemove', (event) => this.keyUpColorHandler(event));

        tolh.dataset.num = this.num;
        tolh.addEventListener('keyup', (event) => this.keyUpTolhHandler(event));

        a.dataset.num = this.num;
        a.addEventListener('keyup', (event) => this.keyUpAHandler(event));

        b.dataset.num = this.num;
        b.addEventListener('keyup', (event) => this.keyUpBHandler(event));

        const button = document.createElement('button');
        button.innerHTML = 'Удалить';
        button.addEventListener('click', () => {
            this.delFunction(inputFunc.dataset.num);
            div.removeChild(inputFunc);
            div.removeChild(inputColor);
            div.removeChild(tolh);
            div.removeChild(a);
            div.removeChild(b);
            div.removeChild(button);
            div.removeChild(br);
        });
        const div = document.getElementById('checklistFiller');
        div.appendChild(inputFunc);
        div.appendChild(inputColor);
        div.appendChild(tolh);
        div.appendChild(a);
        div.appendChild(b);
        div.appendChild(button);
        div.appendChild(br);

        this.num++;
    }
    keyupHandler(event) {
        try {
            let f;
            eval(`f=function(x){
                return ${event.target.value};
            }`);

            this.addFunction(f, event.target.dataset.num);
        }
        catch (e) {
            console.log(e);
        }
    }
    keyUpColorHandler(event) {
        const { value, dataset } = event.target;
        if (value) {
            this.inputColor(value, dataset.num);
        }
    }
    keyUpTolhHandler(event) {
        const { value, dataset } = event.target;
        if (value) {
            this.inputTolh(value, dataset.num);
        }
    }
    keyUpAHandler(event) {
        const { value, dataset } = event.target;
        if (value) {
            this.inputAOfIntegral(value, dataset.num);
        }
    }
    keyUpBHandler(event) {
        const { value, dataset } = event.target;
        if (value) {
            this.inputBOfIntegral(value, dataset.num);
        }
    }

} 