function shotHandler() {
    var x = document.getElementById('x').value - 0;
    var y = document.getElementById('y').value - 0;
    document.getElementById('result').innerHTML = 'Результат: ' + shot(x, y) + ' очков';
}

function shotManyHandler() {
    var count = document.getElementById('count').value - 0;
    var min = document.getElementById('min').value - 0;
    var max = document.getElementById('max').value - 0;
    document.getElementById('result2').innerHTML = 'Результат: ' + shoter(count, min, max) + ' очков';
}

function getRootsHandler(a, b, c, d, e) {
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var c = document.getElementById('c').value;
    var d = document.getElementById('d').value;
    var e = document.getElementById('e').value;
    var roots = getRoots(
        a ? a - 0 : NaN,
        b ? b - 0 : NaN,
        c ? c - 0 : NaN,
        d ? d - 0 : NaN,
        e ? e - 0 : NaN
    );
    document.getElementById('resultRoots').innerHTML = 'Ответ: ' + roots ? roots.join(',') : 'Нет корней';
}

function menuButtonHandler(event) {
    var contents = document.querySelectorAll('.content-item');
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.add('hide');
    }
    var Riccontents = document.querySelectorAll('.Riccontent-item');
    for (var i = 0; i < Riccontents.length; i++) {
        Riccontents[i].classList.add('hide');
    }
    var id = event.target.dataset.content;
    document.getElementById(id).classList.remove('hide');
    document.getElementById('Ric' + id).classList.remove('hide');
}

function themeChanger() {

    let img = document.getElementById('light-theme-image');
    let style = document.getElementById('style');

    if (img.src.includes('img/moon.png')) {
        img.src = 'img/sun.png';
        style.setAttribute("href", "css/lightStyle.css");
        Render();
    }
    else {
        img.src = 'img/moon.png';
        style.setAttribute("href", "css/darkStyle.css");
        Render();
    }
}

// const Template = new Template;

window.onload = function () {
    var button = document.getElementById('light-theme');
    button.addEventListener('click', themeChanger);

    var button = document.getElementById('shot');
    button.addEventListener('click', shotHandler);

    var button = document.getElementById('shotMany');
    button.addEventListener('click', shotManyHandler);

    var button = document.getElementById('getRoots');
    button.addEventListener('click', getRootsHandler);

    var menuButtons = document.querySelectorAll('.menu-item');
    for (var i = 0; i < menuButtons.length; i++) {
        menuButtons[i].addEventListener('click', menuButtonHandler);
    }

    setQuest();

    const MainCanvas = new mainCanvas();

    const Calculator = new CalculatorMenu();

    const Polinomial = new PolynomialCalculatorMenu();

    // newApp({
    //     id: 'app',
    //     template: template.AppTemplate
    // });
};