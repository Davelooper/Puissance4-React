import React from "react"
import { Coin } from './Coin.jsx'
import { PlayersForm } from './PlayersForm.jsx'

/**
 * Contain all components related to the players.
 * @param {*} param0 
 * @returns 
 */
export function PlayersInterface({ playerColor, addCoins, coins, setAlert, currentPlayer, setPlayer, isGameOver }) {

    function getTitle(playerColor) {
        if (playerColor === "yellow") {
            return <h2 className="interface__title">Joueur jaune</h2>
        } else if (playerColor === "red") {
            return <h2 className="interface__title">Joueur rouge</h2>
        }
    }

    return <div className={`interface interface--${playerColor}`}>
        {getTitle(playerColor)}
        <Coin className={`interface__coin interface__coin--${playerColor}`} color={playerColor} setAlert={setAlert} />
        <PlayersForm playerColor={playerColor} addCoins={addCoins} coins={coins} setAlert={setAlert} currentPlayer={currentPlayer} setPlayer={setPlayer} isGameOver={isGameOver} />
    </div>
}