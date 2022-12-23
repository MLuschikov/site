function mainCanvas() {
    const width = 700;
    const height = 700;
    const ZOOM = 1;
    let canMove;

    const WIN = {
        left: -10,
        bottom: -10,
        width: 20,
        height: 20
    };

    const canvas = new Canvas({
        id: 'graph',
        width,
        height,
        WIN,
        callbacks: {
            wheel,
            mouseup,
            mousedown,
            mousemove,
            mouseleave,
        }
    });

    function wheel(event) {
        const delta = event.wheelDelta > 0 ? -ZOOM : ZOOM;
        if (WIN.width + delta > 0) {
            WIN.width += delta;
            WIN.height += delta;
            WIN.left -= delta / 2;
            WIN.bottom -= delta / 2;

            render();

            const { pageX, pageY } = event;
            let pxX = pageX - graph.offsetLeft;
            let pxY = pageY - graph.offsetTop;

            canvas.printMouseSquare(pxX, pxY);
        }
    }

    function mouseup() {
        canMove = false;
    }
    function mousedown() {
        canMove = true;
    }
    function mousemove(event) {
        if (canMove) {
            const { movementX, movementY } = event;
            WIN.left -= canvas.sx(movementX);
            WIN.bottom += canvas.sy(movementY);
        }
        render();
        const { pageX, pageY } = event;
        let pxX = pageX - graph.offsetLeft;
        let pxY = pageY - graph.offsetTop;
        canvas.printMouseSquare(pxX, pxY);
    }
    function mouseleave() {
        canMove = false;
    }

    function printFunction(f, color, tolh) {
        const dx = WIN.width / 100;
        let x = WIN.left;
        while (x < WIN.width + WIN.left) {
            canvas.line(x, f(x), x + dx, f(x + dx), color, tolh);
            x += dx;
        }
    }

    function printIntegral(f, xa, xb) {
        const detailing = 200;
        let intS = getIntegral(f, xa, xb, detailing);
        const dx = Math.abs(xb - xa) / detailing;
        const points = [{ x: xa, y: 0 }];
        while (xa < xb) {
            points.push({ x: xa, y: f(xa) });
            xa = xa + dx;
        }
        points.push({ x: xb, y: 0 });
        canvas.polygon(points);
    }
    function printIntegralValue(f, xa, xb) {
        const detailing = 200;
        let intS = getIntegral(f, xa, xb, detailing);
        const middleX = (xb + xa) / 2;
        const middleY = f(middleX) / 2;
        const size = height / WIN.height / 1.85;
        canvas.text(intS.toFixed(3), middleX, middleY, "#222", size + "pt Arial");
    }
    function getIntegral(f, xa, xb, detailing) {
        const dx = Math.abs(xb - xa) / detailing;
        let S = 0;
        let halfLine = xa + dx / 2;
        while (halfLine < xb) {
            S = S + f(halfLine) * dx;
            halfLine = halfLine + dx;

        }
        return S;
    }

    function printOXY() {
        canvas.line(WIN.left, 0, WIN.width + WIN.left, 0, 'grey', 2); //Ox
        canvas.line(0, WIN.bottom, 0, WIN.height + WIN.bottom, 'grey', 2); //Oy
        canvas.line(0, WIN.bottom + WIN.height, -0.2, WIN.bottom + WIN.height - 0.3, 'grey', 2); //Oy-Стрелка
        canvas.line(0, WIN.bottom + WIN.height, 0.2, WIN.bottom + WIN.height - 0.3, 'grey', 2); //OyСтрелка
        canvas.line(WIN.left + WIN.width, 0, WIN.left + WIN.width - 0.3, -0.2, 'grey', 2); //Ox-Стрелка
        canvas.line(WIN.left + WIN.width, 0, WIN.left + WIN.width - 0.3, 0.2, 'grey', 2); //OxСтрелка

        for (let i = 1; i < WIN.width + WIN.left; i++) {
            canvas.line(i, -0.1, i, 0.1, 'grey', 2);
        }
        for (let i = 1; i > WIN.left; i--) {
            canvas.line(i, -0.1, i, 0.1, 'grey', 2);
        }
        for (let i = 1; i < WIN.height + WIN.bottom; i++) {
            canvas.line(-0.1, i, 0.1, i, 'grey', 2);
        }
        for (let i = 1; i > WIN.bottom; i--) {
            canvas.line(-0.1, i, 0.1, i, 'grey', 2);
        }
    }

    function printMesh() {
        let color;
        let img = document.getElementById('light-theme-image');

        if (img.src.includes('img/moon.png')) {
            color = '#303030';
        }
        else {
            color = '#ddd';
        }
        const tolh = 2;
        for (let i = 0; i < WIN.width + WIN.left; i++) {
            canvas.line(i, WIN.bottom, i, WIN.height + WIN.bottom, color, tolh);
        }
        for (let i = 0; i > WIN.left; i--) {
            canvas.line(i, WIN.bottom, i, WIN.height + WIN.bottom, color, tolh);
        }
        for (let i = 0; i < WIN.height + WIN.bottom; i++) {
            canvas.line(WIN.left, i, WIN.width + WIN.left, i, color, tolh);
        }
        for (let i = 0; i > WIN.bottom; i--) {
            canvas.line(WIN.left, i, WIN.width + WIN.left, i, color, tolh);
        }
    }

    function printText() {
        canvas.text("y", 0 + 0.4, WIN.bottom + WIN.height - 0.5, "grey");
        canvas.text("x", WIN.left + WIN.width - 0.4, 0 + 0.3, "grey");
        canvas.text("0", 0 - 0.2, 0 - 0.5, "grey");
    }

    function printAxleNumbering() {
        const size = height / WIN.height / 2.3;

        for (let i = 1; i < WIN.width + WIN.left; i++) {
            if (i != 0) {
                canvas.text(i, i, 0 - 0.5, "grey", size + "pt Arial");
            }
        }
        for (let i = 1; i > WIN.left; i--) {
            if (i != 0) {
                canvas.text(i, i, 0 - 0.5, "grey", size + "pt Arial");
            }
        }
        for (let i = 1; i < WIN.height + WIN.bottom; i++) {
            if (i != 0) {
                canvas.text(i, 0 - 0.3, i - 0.2, "grey", size + "pt Arial");
            }
        }
        for (let i = 1; i > WIN.bottom; i--) {
            if (i != 0) {
                canvas.text(i, 0 - 0.3, i - 0.2, "grey", size + "pt Arial");
            }
        }
    }

    const funcs = [];

    function render() {
        canvas.clear();

        funcs.forEach(func => {
            if (func !== null && func.a !== null && func.b !== null) {
                printIntegral(func.f, func.a - 0, func.b - 0);
            }
        });

        printMesh();
        printOXY();
        printText();
        printAxleNumbering();

        funcs.forEach(func => {
            if (func !== null) {
                printFunction(func.f, func.color, func.width);
            }
        });

        funcs.forEach(func => {
            if (func !== null && func.a !== null && func.b !== null) {
                printIntegralValue(func.f, func.a - 0, func.b - 0);
            }
        });
    }

    const ui = new UI({ addFunction, delFunction, inputColor, inputTolh, inputAOfIntegral, inputBOfIntegral });

    function addFunction(f, num) {
        funcs[num] = { f, color: 'red', width: 2 };
        render();
    }
    function delFunction(num) {
        funcs[num] = null;
        render();
    }
    function inputColor(color, num) {
        funcs[num].color = color || "#000";
        render();
    }
    function inputTolh(width, num) {
        funcs[num].width = width;
        render();
    }
    function inputAOfIntegral(a, num) {
        funcs[num].a = a;
    };
    function inputBOfIntegral(b, num) {
        funcs[num].b = b;
        render();
    };

    render();

}