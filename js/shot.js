function shotToSqare(x, y) {
    return (Math.abs(x) <= 1 && Math.abs(y) <= 1) ? 1 : 0;
}

function shotToCircle(x, y) {
    return (x * x + y * y <= 1) ? 2 : 0;
}

function shotToRhomb(x, y) {
    return (Math.abs(x) <= 1 - Math.abs(y) && Math.abs(y) <= 1 - Math.abs(x)) ? 3 : 0;
}

function shotToUnCircle(x, y) {
    return ((Math.abs(x) - 1) * (Math.abs(x) - 1) + (Math.abs(y) - 1) * (Math.abs(y) - 1) >= 1) ? 4 : 0;
}

function shotToСenter(x, y) {
    return (x === 0 && y === 0) ? 10 : 0;
}

function shot(x, y) {
    return shotToСenter(x, y) || shotToUnCircle(x, y) || shotToRhomb(x, y) || shotToCircle(x, y) || shotToSqare(x, y) || 0;
}