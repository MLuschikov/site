class Canvas {
    constructor({ id, width = 500, height = 500, WIN, callbacks }) {
        const canvas = document.getElementById(id);
        const context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        const { wheel, mouseup, mousedown, mousemove, mouseleave } = callbacks;
        canvas.addEventListener('wheel', wheel);
        canvas.addEventListener('mouseup', mouseup);
        canvas.addEventListener('mousedown', mousedown);
        canvas.addEventListener('mousemove', mousemove);
        canvas.addEventListener('mouseleave', mouseleave);

        this.sx = (x) => x / canvas.width * WIN.width;
        this.sy = (y) => y / canvas.height * WIN.height;

        const xs = (x) => (x - WIN.left) / WIN.width * canvas.width; //стрелочная функция
        //по сути одно и тоже, но сверху короче
        function ys(y) {
            return canvas.height - (y - WIN.bottom) / WIN.height * canvas.height;
        }

        const unXs = (pxX) => pxX / canvas.width * WIN.width + WIN.left;
        const unYs = (pxY) => (canvas.height - pxY) / canvas.height * WIN.height + WIN.bottom;

        this.clear = function () {
            let img = document.getElementById('light-theme-image');

            if (img.src.includes('img/moon.png')) {
                context.fillStyle = '#535353';
            }
            else {
                context.fillStyle = '#fff';
            }
            context.fillRect(0, 0, canvas.width, canvas.height);
        }

        this.line = function (x1, y1, x2, y2, color, tolh) {
            context.beginPath();
            context.lineWidth = tolh;
            context.strokeStyle = color || '#000';
            context.moveTo(xs(x1), ys(y1));
            context.lineTo(xs(x2), ys(y2));
            context.stroke();
        }

        this.text = function (text, x, y, color, size) {
            context.font = size || "15pt Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = color || "#000";
            context.fillText(text, xs(x), ys(y));
        }

        this.textFoSquer = function (text, x, y, color, size, align, baseline) {
            context.font = size || "15pt Arial";
            context.textAlign = align;
            context.textBaseline = baseline;
            context.fillStyle = color || "#000";
            context.fillText(text, xs(x), ys(y));
        }

        this.printMouseSquare = function (x, y) {
            let oX = unXs(x);
            let oY = unYs(y);
            oX = Math.floor(oX) + 0.5;
            oY = Math.floor(oY) + 0.5;

            let img = document.getElementById('light-theme-image');
            let color = "green";

            if (img.src.includes('img/moon.png')) {
                color = "#e00";
            }
            else {
                color = "green";
            }

            this.line(oX - 0.45, oY + 0.45, oX + 0.45, oY + 0.45, color, 1);
            let xLT = oX - 0.5;
            let yLT = oY + 0.5;
            this.textFoSquer("(" + xLT + ", " + yLT + ")", xLT, yLT, color, "10pt Arial", "right", "bottom");

            this.line(oX + 0.45, oY + 0.45, oX + 0.45, oY - 0.45, color, 1);
            let xRT = oX + 0.5;
            let yRT = oY + 0.5;
            this.textFoSquer("(" + xRT + ", " + yRT + ")", xRT, yRT, color, "10pt Arial", "left", "bottom");

            this.line(oX - 0.45, oY - 0.45, oX + 0.45, oY - 0.45, color, 1);
            let xLB = oX - 0.5;
            let yLB = oY - 0.5;
            this.textFoSquer("(" + xLB + ", " + yLB + ")", xLB, yLB, color, "10pt Arial", "right", "top");

            this.line(oX - 0.45, oY + 0.45, oX - 0.45, oY - 0.45, color, 1);
            let xRB = oX + 0.5;
            let yRB = oY - 0.5;
            this.textFoSquer("(" + xRB + ", " + yRB + ")", xRB, yRB, color, "10pt Arial", "left", "top");
        }

        this.polygon = function (points = [], color = '#f00a') {
            if (points.length >= 3) {
                context.beginPath();
                context.strokeStyle = color;
                context.fillStyle = color;
                context.moveTo(xs(points[0].x), ys(points[0].y));
                for (let i = 1; i < points.length; i++) {
                    context.lineTo(xs(points[i].x), ys(points[i].y));
                }
                context.lineTo(xs(points[0].x), ys(points[0].y));
                context.stroke();
                context.closePath();
                context.fill();
            }
        }
    }
}