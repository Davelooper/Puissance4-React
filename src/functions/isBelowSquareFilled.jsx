/**
 * Return true if the below square contain a coin.
 * @param {array} coins 
 * @param {number} row 
 * @param {number} column 
 * @returns {boolean} 
 */
export function isBelowSquareFilled(coins, row, column) {
    row = parseInt(row, 10)
    column = parseInt(column, 10)
    let isFilled = false
    let belowSquare = row - 1

    if (belowSquare === 0) {
        return true
    }
    coins.forEach(coin => {
        if (coin.row === belowSquare &&
            coin.column === column ||
            belowSquare === 0) {
            isFilled = true
        }
    })
    return isFilled
}