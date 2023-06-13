export const range = (start, stop, step = 1) =>
    Array(Math.ceil((stop - start) / step))
        .fill(start)
        .map((x, y) => x + y * step);

export const rotate = (x, y, deg) => {
    const rad = deg * (Math.PI / 180);
    const newX = x * Math.cos(rad) - y * Math.sin(rad);
    const newY = x * Math.sin(rad) + y * Math.cos(rad);
    return [newX, newY];
};

export const translate = (x, y, xshift, yshift) => {
    return [x + xshift, y + yshift];
};

let x1 = 10;
let y1 = 500;
({ x1, y1 } = rotate(x1, y1, 20));
