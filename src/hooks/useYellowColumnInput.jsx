import { useState } from 'react'

/**
 * Handle the column input of the yellow player.
 * @param {string} initialValue 
 * @returns 
 */
export function useYellowColumnInput(initialValue = "") {
    const [yellowColumnInput, setYellowColumnInput] = useState(initialValue)
    const changeYellowColumnInput = function (value) {
        setYellowColumnInput(value)
    }

    return [
        yellowColumnInput,
        changeYellowColumnInput
    ]
}