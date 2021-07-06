/**
     * Return winner's color. If there's no winner, return false.
     * @param {array} coins 
     * @returns {string|false}
     */
export function isThereAWinner(coins, currentPlayer, row, column) {
    row = parseInt(row, 10)
    column = parseInt(column, 10)
    let horizontal = []
    let vertical = []
    let diagonal1 = []
    let diagonal2 = []

    for (let i = -3; i <= 3; i++) {
        const rowDifference = row - i
        const columnDifference = column - i
        const columnSum = column + i

        if (rowDifference >= 1 && rowDifference <= 6) {
            vertical = [...vertical, { 'row': rowDifference, 'column': column }]
            vertical.sort((a, b) => a.row - b.row)

            if (columnDifference >= 1 && columnDifference <= 7) {
                diagonal1 = [...diagonal1, { 'row': rowDifference, 'column': columnDifference }]
                diagonal1.sort((a, b) => a.row - b.row)
            }

            if (columnSum >= 1 && columnSum <= 7) {
                diagonal2 = [...diagonal2, { 'row': rowDifference, 'column': columnSum }]
                diagonal2.sort((a, b) => a.row - b.row)
            }
        }
        if (columnDifference >= 1 && columnDifference <= 7) {
            horizontal = [...horizontal, { 'row': row, 'column': columnDifference }]
            horizontal.sort((a, b) => a.column - b.column)
        }
    }

    let end = false
    let results = [{ row, column }]
    horizontal.forEach(elt => {
        coins.forEach(elt2 => {
            if (elt2.color === currentPlayer &&
                elt2.row === elt.row &&
                elt2.column === elt.column) {
                results = [...results, elt2]
            }
        })
    })
    if (results.length >= 4) {
        return currentPlayer
    } else {
        results = [{ row, column }]
    }

    vertical.forEach(elt => {
        coins.forEach(elt2 => {
            if (elt2.color === currentPlayer &&
                elt2.row === elt.row &&
                elt2.column === elt.column) {
                results = [...results, elt2]
            }
        })
    })
    if (results.length >= 4) {
        return currentPlayer
    } else {
        results = [{ row, column }]
    }

    diagonal1.forEach(elt => {
        coins.forEach(elt2 => {
            if (elt2.color === currentPlayer &&
                elt2.row === elt.row &&
                elt2.column === elt.column) {
                results = [...results, elt2]
            }
        })
    })
    if (results.length >= 4) {
        return currentPlayer
    } else {
        results = [{ row, column }]
    }

    diagonal2.forEach(elt => {
        coins.forEach(elt2 => {
            if (elt2.color === currentPlayer &&
                elt2.row === elt.row &&
                elt2.column === elt.column) {
                results = [...results, elt2]
            }
        })
    })
    if (results.length >= 4) {
        return currentPlayer
    }

    return false
}