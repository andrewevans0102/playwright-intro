// function formats dollar amount return from square API
const squareDollar = (input: string) => {
    const formatted: number = parseFloat(input);
    // multiply by decimal to adjust for zeros
    const formatted2 = formatted * 0.01;
    return formatted2.toFixed(2);
};

const squareDate = (input: string) => {
    const actualDate: Date = new Date(input);
    const formatted = `${actualDate.toLocaleDateString(
        'en-US'
    )} at ${actualDate.toLocaleTimeString('en-US')}`;
    return formatted;
};

export { squareDollar, squareDate };
