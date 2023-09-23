export function convertToPersianNumbers(input) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    return input.toString().replace(/\d/g, m => persianDigits[m]);
}
