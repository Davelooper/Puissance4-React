import { useState } from 'react'
import { isSquareEmpty } from '../functions/isSquareEmpty.jsx'
import { isBelowSquareFilled } from '../functions/isBelowSquareFilled.jsx'

/**
 * Handle the adding of a played coin.
 * Check if the player is allowed to play.
 * Check if the square is empty.
 * Check if the below square is empty.
 * If all test are passed, add the coin in the coin's list.
 * @param {*} initialCoins 
 * @returns 
 */
export function useCoins(initialCoins = []) {
    const [coins, setCoins] = useState(initialCoins)
    const addCoins = function ({ coins, coin, currentPlayer, playerColor, setAlert, setPlayer }) {
        if (!coin) {
            setCoins([])
        } else {
            coin.row = parseInt(coin.row, 10)
            coin.column = parseInt(coin.column, 10)
            if (coin.row >= 1 && coin.row <= 6 &&
                coin.column >= 1 && coin.column <= 7) {
                if (currentPlayer === playerColor) {
                    if (isSquareEmpty(coins, coin.row, coin.column)) {
                        if (isBelowSquareFilled(coins, coin.row, coin.column)) {
                            setCoins(c => {
                                return [...c, coin]
                            })
                            setPlayer(currentPlayer)
                        } else {
                            setAlert('Attention, vous ne pouvez pas placer un jeton au dessus d\'une case vide.')
                        }
                    } else {
                        setAlert('Attention, cette case contient déjà un jeton.')
                    }
                } else {
                    setAlert('Ce n\'est pas à votre tour.')
                }
            } else {
                setAlert('Cet emplaçement n\'accepte pas de jetons.')
            }
        }
    }

    return [
        coins,
        addCoins
    ]
}