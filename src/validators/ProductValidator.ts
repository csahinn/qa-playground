export function validateText(inputText: string): boolean {
    if (inputText.trim() === "") {
        return false; 
    }
    return true;
}

export function validateInteger(inputInteger: string): boolean {
    const integer = Number(inputInteger);

    return (
        inputInteger.trim() !== "" &&
        Number.isInteger(integer) &&
        integer >= 0
    )
}

export function validateDouble(inputDouble: string): boolean {
    const double = Number(inputDouble);

    return (
        inputDouble.trim() !== "" &&
        Number.isFinite(double) &&
        double >= 0
    )
}