import React, { useContext } from "react"
import { useRedRowInput } from '../hooks/useRedRowInput.jsx'
import { useRedColumnInput } from '../hooks/useRedColumnInput.jsx'
import { useYellowColumnInput } from '../hooks/useYellowColumnInput.jsx'
import { useYellowRowInput } from '../hooks/useYellowRowInput.jsx'
import { gameOver } from '../functions/gameOver.jsx'
import { AlertContext } from "../contexts/AlertContext.jsx"

export function PlayersForm({ playerColor, addCoins, coins, currentPlayer, isGameOver, setPlayer }) {
    const [rowInput, changeRowInput, columnInput, changeColumnInput] = getInputsHooks(playerColor)
    const { setAlert } = useContext(AlertContext)

    function getInputsHooks(playerColor) {
        if (playerColor === 'yellow') {
            return [...useYellowRowInput(''), ...useYellowColumnInput('')]
        } else if (playerColor === 'red') {
            return [...useRedRowInput(''), ...useRedColumnInput('')]
        }
    }

    function checkInputs(row, column) {
        let rowNumber = parseInt(row, 10)
        let columnNumber = parseInt(column, 10)
        if (!Number.isNaN(rowNumber) && !Number.isNaN(columnNumber)) {
            if (rowNumber >= 1 && rowNumber <= 6) {
                if (columnNumber >= 1 && columnNumber <= 7) {
                    return true
                } else {
                    setAlert("Attention, le numéro de colonne doit être compris entre 1 et 7.")
                    return false
                }
            } else {
                setAlert("Attention, le numéro de ligne doit être compris entre 1 et 6.")
                return false
            }
        } else {
            setAlert("Attention, les numéros de ligne et de colonnes doivent être des chiffres.")
            return false
        }
    }

    function handleInputChange(e) {
        const classElt = e.target.classList[0]
        if (classElt === 'form__columnInput') {
            changeColumnInput(e.target.value)
        } else if (classElt === 'form__rowInput') {
            changeRowInput(e.target.value)
        }
    }

    function handleSubmitClick(e) {
        setAlert('')
        changeColumnInput('')
        changeRowInput('')

        if (checkInputs(rowInput, columnInput)) {
            const coin = {
                row: rowInput,
                column: columnInput,
                color: playerColor
            }
            addCoins({ coin, coins, currentPlayer, playerColor, setAlert, setPlayer })
        }
        gameOver(isGameOver, setAlert, coins, currentPlayer, rowInput, columnInput)
    }

    return <div className={`form form--${playerColor}`}>
        <input
            className={`form__rowInput form__rowInput--${playerColor}`}
            type="text"
            name="rowInput"
            placeholder="Numéro de ligne"
            onChange={handleInputChange}
            value={rowInput}
        />
        <input
            className={`form__columnInput form__columnInput--${playerColor}`}
            type="text"
            name="columnInput"
            placeholder="Numéro de colonne"
            onChange={handleInputChange}
            value={columnInput}
        />
        <button
            className={`form__submitBtn form__submitBtn--${playerColor}`}
            onClick={handleSubmitClick}>Valider</button>
    </div>
}