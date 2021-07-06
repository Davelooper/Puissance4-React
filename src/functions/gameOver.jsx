import { isThereAWinner } from '../functions/isThereAWinner.jsx'
/**
 * Set isGameOver to true and display the winner when the game is over.
 */
export function gameOver(isGameOver, setAlert, coins, currentPlayer, row, column) {
    const isEnd = isThereAWinner(coins, currentPlayer, row, column)
    if (isEnd) {
        isGameOver(true)
        if (isEnd === "red") {
            setAlert(`Le joueur rouge a gagné !`)
        } else if (isEnd === "yellow") {
            setAlert(`Le joueur jaune a gagné !`)
        }
    }
}