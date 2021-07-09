import React, { useContext } from "react"
import { useDrop } from 'react-dnd'
import { gameOver } from '../functions/gameOver.jsx'
import { AlertContext } from "../contexts/AlertContext.jsx"

export function GridRow({ coins, className, children, coordinates, addCoins, currentPlayer, setPlayer, isGameOver }) {
    const { setAlert } = useContext(AlertContext)

    if (coordinates) {
        if (coordinates.row === 1 && coordinates.column === 2) {
        }
        let coin
        var [{ isOver }, drop] = useDrop(
            () => ({
                accept: ['yellowCoin', 'redCoin'],
                collect: monitor => ({
                    isOver: !!monitor.isOver()

                }),
                drop: (monitor) => {
                    setAlert('')
                    coin = {
                        'row': coordinates.row,
                        'column': coordinates.column,
                        'color': monitor.color
                    }
                    addCoins({
                        coin,
                        coins,
                        currentPlayer,
                        setAlert,
                        setPlayer,
                        'playerColor': monitor.color,
                    })
                    gameOver(isGameOver, setAlert, coins, currentPlayer, coin.row, coin.column)
                },
            }), [
            coin,
            coins,
            currentPlayer,
            setAlert,
            setPlayer]
        )
    }
    return <div
        className={className}
        ref={drop}>{children}</div>
}