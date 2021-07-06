/**
     * Return true if the row contain an another coin.
     * @param {array} coins 
     * @param {number} row 
     * @param {number} column 
     * @returns {boolean} 
     */
export function isSquareEmpty(coins, row, column) {
    row = parseInt(row, 10)
    column = parseInt(column, 10)
    let empty = true

    coins.forEach(coin => {
        if (coin.row === row &&
            coin.column === column) {
            empty = false
        }
    })
    return empty
}