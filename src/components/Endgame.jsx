import React, { useContext } from "react"
import { AlertContext } from "../contexts/AlertContext.jsx"

/**
 * This component is displayed when the game is over.
 * It allow the player to restart a new game.
 * @param {*} param0 
 * @returns 
 */
export function Endgame({ addCoins, isGameOver }) {
    const { setAlert } = useContext(AlertContext)

    function newGame() {
        addCoins([])
        setAlert('')
        isGameOver(false)
    }

    function handleBtnClick(e) {
        if (e.target.textContent === 'Oui') {
            newGame()
        }
    }
    return <div>
        <p>Refaire une partie ?</p>
        <button onClick={handleBtnClick}>Oui</button>
    </div>

}