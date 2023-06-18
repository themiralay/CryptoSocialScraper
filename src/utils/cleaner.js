async function cleanStringToInt(string) {
    const cleanedStr = string.replace(/\D/g, '');
    const result = parseInt(cleanedStr, 10);
    return result;
}