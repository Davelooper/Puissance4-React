import { useState } from 'react'

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
            if (currentPlayer === playerColor) {
                if (!isBoxFilled(coins, coin.row, coin.column)) {
                    if (isBelowBoxFilled(coins, coin.row, coin.column)) {
                        if (coin.row >= 1 && coin.row <= 6 &&
                            coin.column >= 1 && coin.column <= 7) {
                            let isInCoins = false
                            coins.forEach((coin2, i) => {
                                if (coin.row === coin2.row &&
                                    coin.column === coin2.column) {
                                    isInCoins = true
                                }
                            })
                            if (!isInCoins) {
                                setCoins(c => {
                                    return [...c, coin]
                                })
                                setPlayer(currentPlayer)
                            }
                        }
                    } else {
                        setAlert('Attention, vous ne pouvez pas placer un jeton au dessus d\'une case vide.')
                    }
                } else {
                    setAlert('Attention, cette case contient déjà un jeton.')
                }
            } else {
                setAlert('Ce n\'est pas à votre tour.')
            }
        }
    }

    return [
        coins,
        addCoins
    ]
}