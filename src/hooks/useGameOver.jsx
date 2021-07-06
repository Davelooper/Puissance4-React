import { useState } from "react"

/**
 * Handle the end of the game.
 * If the game is over, return true, else return false.
 * @param {boolean} initialValue 
 * @returns {boolean}
 */
export function useGameOver(initialValue = false) {
    const [gameOver, setGameOver] = useState(initialValue)
    const isGameOver = function (value) {
        setGameOver(value)
    }

    return [
        gameOver,
        isGameOver
    ]
}
