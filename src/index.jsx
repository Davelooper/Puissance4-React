import React, { useState } from "react"
import ReactDOM from 'react-dom'
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useAlert } from './hooks/useAlert.jsx'
import { useGameOver } from './hooks/useGameOver.jsx'
import { useCurrentPlayer } from './hooks/useCurrentPlayer.jsx'
import { useCoins } from './hooks/useCoins.jsx'
import { useRedRowInput } from './hooks/useRedRowInput.jsx'
import { useRedColumnInput } from './hooks/useRedColumnInput.jsx'
import { useYellowColumnInput } from './hooks/useYellowColumnInput.jsx'
import { useYellowRowInput } from './hooks/useYellowRowInput.jsx'






function Alert({ alert }) {
    return <>
        <p className="game__alert">{alert}</p>
    </>
}

function Endgame({ setAlert, addCoins, setPlayer, isGameOver }) {

    function newGame() {
        addCoins([])
        setAlert('')
        isGameOver(false)
    }

    function handleBtnClick(e) {
        if (e.target.textContent === 'Oui') {
            newGame()
        } else {
            setAlert("Dommage")
        }

    }
    return <div>
        <p>Voulez-vous refaire une partie ?</p>
        <button onClick={handleBtnClick}>Oui</button>
        <button onClick={handleBtnClick}>Non</button>
    </div>

}

function CurrentPlayer({ currentPlayer }) {
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

function PlayersInterface({ playerColor, addCoins, coins, setAlert, currentPlayer, setPlayer, isGameOver }) {

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

function Coin({ color, className, setAlert }) {

    function getHookByColor(color) {
        if (color === 'yellow') {
            const [{ isDragging }, drag] = useDrag(() =>
            ({
                type: 'yellowCoin',
                item: { 'color': 'yellow' },
                collect: monitor => ({
                    isDragging: !!monitor.isDragging(),
                }),
            })
            )

            return [{ isDragging }, drag]
        } else if (color === 'red') {
            const [{ isDragging }, drag] = useDrag(() => ({
                type: 'redCoin',
                item: { 'color': 'red' },
                collect: monitor => ({
                    isDragging: !!monitor.isDragging(),
                }),
            }))
            return [{ isDragging }, drag]
        }
    }

    const [{ isDragging }, drag] = getHookByColor(color)

    return <div
        className={className}
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}></div>
}

/**
     * Return winner's color. If there is no winner, return false.
     * @param {array} coins 
     * @returns {string|false}
     */
function endGame(coins, currentPlayer, row, column) {
    row = parseInt(row, 10)
    column = parseInt(column, 10)
    let horizontal = []
    let vertical = []
    let diagonal1 = []
    let diagonal2 = []

    for (let i = -3; i <= 3; i++) {
        const rowDifference = row - i
        const columnDifference = column - i
        const columnSum = column + i

        if (rowDifference >= 1 && rowDifference <= 6) {
            vertical = [...vertical, { 'row': rowDifference, 'column': column }]
            vertical.sort((a, b) => a.row - b.row)

            if (columnDifference >= 1 && columnDifference <= 7) {
                diagonal1 = [...diagonal1, { 'row': rowDifference, 'column': columnDifference }]
                diagonal1.sort((a, b) => a.row - b.row)
            }

            if (columnSum >= 1 && columnSum <= 7) {
                diagonal2 = [...diagonal2, { 'row': rowDifference, 'column': columnSum }]
                diagonal2.sort((a, b) => a.row - b.row)
            }
        }
        if (columnDifference >= 1 && columnDifference <= 7) {
            horizontal = [...horizontal, { 'row': row, 'column': columnDifference }]
            horizontal.sort((a, b) => a.column - b.column)
        }
    }

    let end = false
    let results = [{ row, column }]
    horizontal.forEach(elt => {
        coins.forEach(elt2 => {
            if (elt2.color === currentPlayer &&
                elt2.row === elt.row &&
                elt2.column === elt.column) {
                results = [...results, elt2]
            }
        })
    })
    if (results.length >= 4) {
        return currentPlayer
    } else {
        results = [{ row, column }]
    }

    vertical.forEach(elt => {
        coins.forEach(elt2 => {
            if (elt2.color === currentPlayer &&
                elt2.row === elt.row &&
                elt2.column === elt.column) {
                results = [...results, elt2]
            }
        })
    })
    if (results.length >= 4) {
        return currentPlayer
    } else {
        results = [{ row, column }]
    }

    diagonal1.forEach(elt => {
        coins.forEach(elt2 => {
            if (elt2.color === currentPlayer &&
                elt2.row === elt.row &&
                elt2.column === elt.column) {
                results = [...results, elt2]
            }
        })
    })
    if (results.length >= 4) {
        return currentPlayer
    } else {
        results = [{ row, column }]
    }

    diagonal2.forEach(elt => {
        coins.forEach(elt2 => {
            if (elt2.color === currentPlayer &&
                elt2.row === elt.row &&
                elt2.column === elt.column) {
                results = [...results, elt2]
            }
        })
    })
    if (results.length >= 4) {
        return currentPlayer
    }

    return false
}

/**
 * Check if the game is over.
 * If yes, set the hook value isGameOver to true and display the winner.
 */
function finish(isGameOver, setAlert, coins, currentPlayer, row, column) {
    const isEnd = endGame(coins, currentPlayer, row, column)
    if (isEnd) {
        isGameOver(true)
        if (isEnd === "red") {
            setAlert(`Le joueur rouge a gagné !`)
        } else if (isEnd === "yellow") {
            setAlert(`Le joueur jaune a gagné !`)
        }
    }
}

function PlayersForm({ playerColor, addCoins, coins, setAlert, currentPlayer, isGameOver, setPlayer, endGame }) {
    const [rowInput, changeRowInput, columnInput, changeColumnInput] = getInputsHooks(playerColor)

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
        finish(isGameOver, setAlert, coins, currentPlayer, rowInput, columnInput)
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

function Grid({ coins, addCoins, setAlert, currentPlayer, setPlayer, isGameOver }) {

    function insertCoin(coins, box) {
        let elt = null
        coins.forEach((coin) => {
            if (coin.row === box.row &&
                coin.column === box.column) {
                elt = <GridRow
                    key={`r${box.row}c${box.column}`}
                    keyRow={`r${box.row}c${box.column}`}
                    className={`grid__row grid__row--round grid__row--${coin.color} grid__r${box.row}c${box.column}`}
                    setAlert={setAlert}
                    currentPlayer={currentPlayer}
                    setPlayer={setPlayer}
                >
                    <GridCoin color={coin.color} />
                </GridRow>
            }
        })
        return elt
    }

    function createGrid(coins, addCoins, setPlayer, setAlert, currentPlayer) {
        let grid = []
        for (let i = 6; i >= 0; i--) {
            for (let j = 0; j < 8; j++) {
                let elt
                if (i === 0 && j === 0) {
                    elt = <GridRow
                        keyRow={`r${i}c${j}`}
                        key={`r${i}c${j}`}
                        className={`grid__row grid__row--r${i}c${j}`}
                    />
                }
                else if (i > 0 && j === 0) {
                    elt = <GridRow
                        key={`r${i}c${j}`}
                        className={`grid__row grid__row grid__row--r${i}c${j}`}
                    >
                        <GridNumber number={i} key={`c${i}`} />
                    </GridRow>
                }
                else if (j > 0 && i === 0) {
                    elt = <GridRow
                        key={`r${i}c${j}`}
                        className={`grid__row grid__row grid__row--r${i}c${j}`}
                    >
                        <GridNumber number={j} key={`r${j}`} />
                    </GridRow>
                }
                else {
                    elt = insertCoin(coins, { row: i, column: j }) ||
                        <GridRow
                            coordinates={{
                                'row': i,
                                'column': j
                            }}
                            coins={coins}
                            addCoins={addCoins}
                            setPlayer={setPlayer}
                            setAlert={setAlert}
                            key={`r${i}c${j}`}
                            keyRow={`r${i}c${j}`}
                            currentPlayer={currentPlayer}
                            className={`grid__row grid__row--round grid__r${i}c${j}`}
                            isGameOver={isGameOver}
                        />
                }
                grid = [...grid, elt]
            }
        }
        return grid
    }

    return <div className="grid">
        {
            createGrid(coins, addCoins, setPlayer, setAlert, currentPlayer)
        }
    </div>
}

function GridRow({ coins, className, children, coordinates, addCoins, currentPlayer, setAlert, setPlayer, isGameOver }) {
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
                    finish(isGameOver, setAlert, coins, currentPlayer, coin.row, coin.column)
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

function Game() {
    const [coins, addCoins] = useCoins()
    const [alert, setAlert] = useAlert('')
    const [currentPlayer, setPlayer] = useCurrentPlayer('yellow')
    const [gameOver, isGameOver] = useGameOver(false)

    return <DndProvider backend={HTML5Backend}><div className="game">
        <h1 className="game__title">Puissance 4</h1>
        {gameOver ? <Endgame
            setAlert={setAlert}
            addCoins={addCoins}
            setPlayer={setPlayer}
            isGameOver={isGameOver}
        /> : null}
        <CurrentPlayer currentPlayer={currentPlayer} />
        <div className="game__layout">
            <PlayersInterface
                playerColor={'yellow'}
                addCoins={addCoins}
                coins={coins}
                setAlert={setAlert}
                currentPlayer={currentPlayer}
                setPlayer={setPlayer}
                isGameOver={isGameOver}
            />
            <Grid
                coins={coins}
                addCoins={addCoins}
                setAlert={setAlert}
                currentPlayer={currentPlayer}
                setPlayer={setPlayer}
                isGameOver={isGameOver}
            />
            <PlayersInterface
                playerColor={'red'}
                addCoins={addCoins}
                coins={coins}
                setAlert={setAlert}
                currentPlayer={currentPlayer}
                setPlayer={setPlayer}
                isGameOver={isGameOver}
            />
        </div>
        <Alert alert={alert} />
    </div>
    </DndProvider>
}

function GridCoin({ color }) {
    return <div className={`grid__coin grid__coin--${color}`}></div>
}

function GridNumber({ number }) {
    return <span>{number}</span>
}

/**
     * Return true if the row contain an another coin.
     * @param {array} coins 
     * @param {number} row 
     * @param {number} column 
     * @returns {boolean} 
     */
function isBoxFilled(coins, row, column) {
    row = parseInt(row, 10)
    column = parseInt(column, 10)
    let alreadyFilled = false
    coins.forEach(coin => {
        if (coin.row === row &&
            coin.column === column) {
            alreadyFilled = true
        }
    })
    return alreadyFilled
}

/**
 * Return true if the below box contain a coin.
 * @param {array} coins 
 * @param {number} row 
 * @param {number} column 
 * @returns {boolean} 
 */
function isBelowBoxFilled(coins, row, column) {
    row = parseInt(row, 10)
    column = parseInt(column, 10)
    let isFilled = false
    let belowRow = row - 1

    if (belowRow === 0) {
        return true
    }
    coins.forEach(coin => {
        if (coin.row === belowRow &&
            coin.column === column ||
            belowRow === 0) {
            isFilled = true
        }
    })
    return isFilled
}


/*------------------DnD----------------------------- */
let observer = null
const ItemTypes = {
    YELLOWCOIN: 'yellowcoin',
    REDCOIN: 'redcoin'
}

function emitChange() {
    observer()
}

function observe(o) {
    if (observer) {
        throw new Error('Multiple observers not implemented.')
    }

    observer = o
    emitChange()
}

ReactDOM.render(<Game />, document.getElementById('app'))
/*----------------------Fin DnD----------------------------*/
