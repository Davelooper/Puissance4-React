import { useState } from 'react'

/**
 * Handle the row input of the red player.
 * @param {*} initialValue 
 * @returns 
 */
export function useRedRowInput(initialValue = "") {
    const [redRowInput, setRedRowInput] = useState(initialValue)
    const changeRedRowInput = function (value) {
        setRedRowInput(value)
    }

    return [
        redRowInput,
        changeRedRowInput
    ]
}