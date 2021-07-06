import React, { useState } from "react"
import ReactDOM from 'react-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useAlert } from './hooks/useAlert.jsx'
import { useGameOver } from './hooks/useGameOver.jsx'
import { useCurrentPlayer } from './hooks/useCurrentPlayer.jsx'
import { useCoins } from './hooks/useCoins.jsx'
import { Alert } from './components/Alert.jsx'
import { CurrentPlayer } from './components/CurrentPlayer.jsx'
import { PlayersInterface } from './components/PlayersInterface.jsx'
import { Grid } from './components/Grid.jsx'
import { Endgame } from './components/Endgame.jsx'


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

/*----------------------End DnD----------------------------*/



/**
 * The main component who contains the others.
 * @returns 
 */
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

ReactDOM.render(<Game />, document.getElementById('app'))


