import React from "react"

/**
 * Display the player who has to play on the screen.
 * @param {*} param0 
 * @returns 
 */
export function CurrentPlayer({ currentPlayer }) {
    const yellow = "C'est au joueur jaune."
    const red = "C'est au joueur rouge."
    if (currentPlayer === "yellow") {
        return <p className="game__currentPlayer game__currentPlayer--yellow">{yellow}</p>
    } else if (currentPlayer === 'red') {
        return <p className="game__currentPlayer game__currentPlayer--red">{red}</p>
    } else {
        console.error(`Erreur, le joueur ${currentPlayer} n'existe pas.`)
    }

}