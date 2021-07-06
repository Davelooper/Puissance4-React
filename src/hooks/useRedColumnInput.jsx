import { useState } from 'react'

/**
 * Handle the column input of the red player.
 * @param {string} initialValue 
 * @returns 
 */
export function useRedColumnInput(initialValue = "") {
    const [redColumnInput, setRedColumnInput] = useState(initialValue)
    const changeRedColumnInput = function (value) {
        setRedColumnInput(value)
    }

    return [
        redColumnInput,
        changeRedColumnInput
    ]
}