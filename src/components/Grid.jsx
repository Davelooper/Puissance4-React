import React from "react"
import { GridRow } from './GridRow.jsx'
import { GridCoin } from './GridCoin.jsx'
import { GridNumber } from './GridNumber.jsx'

export function Grid({ coins, addCoins, setAlert, currentPlayer, setPlayer, isGameOver }) {

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