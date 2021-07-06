import { useState } from 'react'

/**
 * Handle the player who has to play.
 * Retrun this player color.
 * @param {string} initialPlayer 
 * @returns 
 */
export function useCurrentPlayer(initialPlayer = "yellow") {
    const [currentPlayer, choosePlayer] = useState(initialPlayer)
    const setPlayer = function (player) {
        if (player === "yellow") {
            choosePlayer("red")
        } else if (player === "red") {
            choosePlayer("yellow")
        }
    }

    return [
        currentPlayer,
        setPlayer
    ]
}